const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const HOMEDIR = require('os').homedir();
const nodeConfig = require('../package.json');
const { error, info, warn, debug, initializeLogger } = require('./ArchLogger');

initializeLogger();

const flexBrowserInstances = [];

const browserWindowOptions = {
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
    },
    titleBarStyle: 'customButtonsOnHover',
    transparent: true,
    vibrancy: 'light',
};

/**
 * Creates a new instance of a web browser window.
 *
 */
function createWindow() {
    info(
        'Creating new browser instance with options: ' +
            JSON.stringify(browserWindowOptions, null, 4),
    );

    // @ts-ignore
    const win = new BrowserWindow(browserWindowOptions);

    flexBrowserInstances.push(win);

    win.loadFile('app/index.html');
    info('Loaded app/index.html to browser instance');

    win.setBrowserView(new BrowserView());
    info('Loaded Electron BrowserView');

    win.getBrowserView().setBounds({
        x: 0,
        y: 70,
        width: win.getSize()[0],
        height: win.getSize()[1] - 70,
    });
    info('Redefined dimensions for Electron BrowserView');

    win.getBrowserView().webContents.loadURL('https://google.com');
    info('Loaded Google as default homepage');

    win.addListener('resize', () => {
        win.getBrowserView().setBounds({
            x: 0,
            y: 70,
            width: win.getSize()[0],
            height: win.getSize()[1] - 70,
        });
    });
    info('Binded Listener for resizing browser window');

    ipcMain.on('changeUrl', (_, to) => {
        if (win.isFocused()) win.getBrowserView().webContents.loadURL(to);
    });

    ipcMain.on('newWindow', createWindow);

    ipcMain.on('getWindowList', event => {
        let obj = flexBrowserInstances.map(instance => ({
            title: instance.getBrowserView().webContents.getTitle(),
            url: instance.getBrowserView().webContents.getURL(),
        }));
        event.returnValue = obj;
    });

    ipcMain.on('getBookmarks', event => {
        event.returnValue = readBookmarksFile();
    });

    ipcMain.on('addBookmark', (event, meta) => {
        let bookmarks = readBookmarksFile();
        if (!bookmarks.filter(curr => curr.url == meta.url)) {
            bookmarks.push(meta);
            writeBookmarksFile(bookmarks);
        }
    });

    info('Binded IPC Main listeners');
}

/**
 * Creates an instance of a hub window.
 *
 */
function createHubWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        titleBarStyle: 'hidden',
        transparent: true,
        vibrancy: 'light',
    });

    info('Hub Window Created.');
    win.loadFile('app/hub.html').then(() => info('Hub Window source loaded.'));
}

function firstStartWindow() {
    info('Loaded ');
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        titleBarStyle: 'hiddenInset',
        transparent: true,
        vibrancy: 'light',
    });

    info('First Start Window Created.');
    win.loadFile('app/first-start.html').then(() =>
        info('First Start Window source loaded.'),
    );
}

function startup() {
    info('Entering startup');

    let browserPrefs = readRC();
    info(
        'Loaded flexrc: ' + browserPrefs
            ? JSON.stringify(browserPrefs, null, 4)
            : 'null',
    );

    if (browserPrefs == null) {
        writeRC({
            lastSession: {
                version: '0.0.1',
            },
        });
        info('Since no flexrc file was found in ~/.flexrc, one was created.');
        firstStartWindow();
        info('Loaded first start page.');
    } else if (browserPrefs.lastSession.version != nodeConfig.version) {
        firstStartWindow();
        info('Running on a new browser version; loaded first start page.');
    } else {
        createHubWindow();
        info('Loaded Hub Window.');
        createWindow();
        info('Loaded browser window');
    }
}

/**
 * @returns The flex runcome file in JSON format
 */
const readRC = (exports.readRC = () => {
    try {
        const text = fs.readFileSync(
            path.join(HOMEDIR, '.flexrc.json'),
            'utf-8',
        );
        info('Read RC File.');
        return JSON.parse(text);
    } catch (e) {
        info('Error reading/parsing RC File.');
        return null;
    }
});

const writeRC = (exports.writeRC = data => {
    fs.writeFileSync(path.join(HOMEDIR, '.flexrc.json'), JSON.stringify(data));
    info('Finished writing RC File');
});

/**
 * Reads the bookmarks file
 *
 * @returns The URLMeta[] of bookmarks from the bookmarks file.
 *
 */
const readBookmarksFile = (exports.readBookmarksFile = () => {
    try {
        info('Reading bookmarks File.');
        return JSON.parse(
            fs.readFileSync(
                path.join(HOMEDIR, '.flex-bookmarks.json'),
                'utf-8',
            ),
        );
    } catch (e) {
        info('Error reading/parsing bookmarks file.');
        return [];
    }
});

/**
 * Write to the bookmarks file.
 *
 * @param bookmarks The `URLMeta[]` to save to `~/.flex-bookmarks.json`.
 *
 */
const writeBookmarksFile = (exports.writeBookmarksFile = bookmarks => {
    fs.writeFileSync(
        path.join(HOMEDIR, '.flex-bookmarks.json'),
        JSON.stringify(bookmarks),
    );
    info('Finished writing bookmarks file.');
});

if (app) {
    app.whenReady().then(() => startup());
}
