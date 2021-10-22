const {
    app,
    BrowserWindow,
    BrowserView,
    ipcMain,
    nativeTheme,
} = require('electron');
const path = require('path');
const nodeConfig = require('../package.json');
const { info, debug, initializeLogger } = require('./apis/ArchLogger');
const {
    readRC,
    writeRC,
    readHistoryFile,
    writeHistoryFile,
    readBookmarksFile,
    writeBookmarksFile,
    readBrandingRegistry,
    writeBrandingRegistry,
} = require('./apis/CoreAccess.js');

initializeLogger();

const flexBrowserInstances = [];
let hubWindow = undefined;

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
    vibrancy: readRC().theme || 'dark',
};

// During testing, ipcMain is undefined.
// This guard should not be removed.
if (ipcMain) {
    info('Defining IPC Main API');

    ipcMain.on('newWindow', createWindow);
    info('Defined (on) newWindow');

    ipcMain.on('getWindowList', event => {
        debug(
            `Retrieving window list. Found ${flexBrowserInstances.length} windows.`,
        );

        let obj = flexBrowserInstances.map(instance => {
            return {
                title: instance.getBrowserView().webContents.getTitle(),
                url: instance.getBrowserView().webContents.getURL(),
                windowId: instance.id,
            };
        });

        debug(
            `Returning from getWindowList with ${JSON.stringify(obj, null, 4)}`,
        );

        event.returnValue = obj;
    });
    info('Defined (on) getWindowList');

    ipcMain.on('getBookmarks', event => {
        event.returnValue = readBookmarksFile();
    });
    info('Defined (on) getBookmarks');

    ipcMain.on('addBookmark', (event, meta) => {
        let bookmarks = readBookmarksFile();
        if (!bookmarks.filter(curr => curr.url == meta.url)) {
            bookmarks.push(meta);
            writeBookmarksFile(bookmarks);
        }
    });
    info('Defined (on) addBookmark');

    ipcMain.on('changeUrl', (event, to) => {
        flexBrowserInstances
            .find(i => i.webContents == event.sender)
            .getBrowserView()
            .webContents.loadURL(to);
    });
    info('Binded URL Bar onchange listener');

    ipcMain.on('pref', (event, preference, value) => {
        const rc = readRC();
        if (value) {
            rc[preference] = value;
            writeRC(rc);
        }
        if (Object.prototype.hasOwnProperty.call(rc, preference)) {
            event.returnValue = rc[preference];
        } else {
            event.returnValue = undefined;
        }
    });
    info('Defined (on) pref');

    ipcMain.on('getAllPreferences', event => {
        event.returnValue = readRC();
    });
    info('Defined (on) getAllPreferences');

    ipcMain.on('brandRegistry', (event, rule, branding) => {
        const registry = readBrandingRegistry();
        if (rule && branding) {
            registry[rule] = branding;
            writeBrandingRegistry(registry);
            event.returnValue = branding;
        } else if (rule) {
            event.returnValue = registry[rule];
        } else {
            throw new Error('IPC: brandRegistry must provide rule parameter');
        }
    });

    ipcMain.on('focusWindow', (event, id) => {
        const instance = flexBrowserInstances.find(
            instance => instance.id == id,
        );

        instance.focus();
        instance.flashFrame(true);
        setTimeout(() => instance.flashFrame(false), 1000);
    });

    ipcMain.on('focusHub', () => {
        if (hubWindow === null || hubWindow === undefined) {
            createHubWindow();
        }
        hubWindow.focus();
        hubWindow.flashFrame(true);
        setTimeout(() => hubWindow.flashFrame(false), 1000);
    });

    ipcMain.on('urlInfo', event => {
        const instance = flexBrowserInstances.find(
            i => i.webContents == event.sender,
        );
        const browserView = instance.getBrowserView();
        event.returnValue = {
            url: browserView.webContents.getURL(),
            title: browserView.webContents.getTitle(),
            windowId: instance.id,
        };
    });
}

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

    const config = readRC();

    if ((config.theme || 'dark') === 'dark') nativeTheme.themeSource = 'dark';
    else nativeTheme.themeSource = 'light';

    flexBrowserInstances.push(win);

    win.loadFile('app/loaders/index.html');
    info('Loaded app/loaders/index.html to browser instance');

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

    win.getBrowserView().webContents.addListener('did-navigate-in-page', () => {
        win.webContents.executeJavaScript('signal("browser-navigated")');

        const history = readHistoryFile();
        const { webContents } = win.getBrowserView();

        history.push({
            url: webContents.getURL(),
            title: webContents.getTitle(),
        });

        writeHistoryFile(history);
    });

    win.addListener('close', () => {
        flexBrowserInstances.splice(flexBrowserInstances.indexOf(win), 1);
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

    info('Hub Window Created.');
    win.loadFile('app/loaders/hub.html').then(() =>
        info('Hub Window source loaded.'),
    );

    win.addListener('close', () => {
        hubWindow = null;
    });

    hubWindow = win;
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
    win.loadFile('app/loaders/first-start.html').then(() =>
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
            colorTheme: 'blue',
            theme: 'dark',
            searchEngines: [
                {
                    id: 'google',
                    name: 'Google',
                    urlPrefix: 'https://google.com/search?q=',
                },
                {
                    id: 'duck-duck-go',
                    name: 'Duck Duck Go',
                    urlPrefix: 'https://duckduckgo.com/q=',
                },
                {
                    id: 'bing',
                    name: 'Bing',
                    urlPrefix: 'https://duckduckgo.com/q=',
                },
            ],
            defaultSearchEngine: 'google',
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

if (app) app.whenReady().then(() => startup());
