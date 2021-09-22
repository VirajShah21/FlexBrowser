const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const HOMEDIR = require('os').homedir();

const flexBrowserInstances = [];

/**
 * Creates a new instance of a web browser window.
 *
 */
function createWindow() {
    const win = new BrowserWindow({
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
    });

    flexBrowserInstances.push(win);

    win.loadFile('app/index.html');

    win.setBrowserView(new BrowserView());
    win.getBrowserView().setBounds({
        x: 0,
        y: 70,
        width: win.getSize()[0],
        height: win.getSize()[1] - 70,
    });
    win.getBrowserView().webContents.loadURL('https://google.com');

    win.addListener('resize', () => {
        win.getBrowserView().setBounds({
            x: 0,
            y: 70,
            width: win.getSize()[0],
            height: win.getSize()[1] - 70,
        });
    });

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

    win.loadFile('app/hub.html');
}

function firstStart() {
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

    win.loadFile('app/first-start.html');
}

/**
 * Reads the bookmarks file
 *
 * @returns The URLMeta[] of bookmarks from the bookmarks file.
 *
 */
const readBookmarksFile = (exports.readBookmarksFile = () => {
    try {
        return JSON.parse(
            fs.readFileSync(
                path.join(HOMEDIR, '.flex-bookmarks.json'),
                'utf-8',
            ),
        );
    } catch (e) {
        return [];
    }
});

/**
 * Write to the bookmarks file.
 *
 */
const writeBookmarksFile = (exports.writeBookmarksFile = bookmarks => {
    fs.writeFileSync(
        path.join(HOMEDIR, '.flex-bookmarks.json'),
        JSON.stringify(bookmarks),
    );
});

if (app) {
    app.whenReady().then(() => {
        createWindow();
        createHubWindow();
        firstStart();
    });
}
