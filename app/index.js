const {
    app,
    BrowserWindow,
    BrowserView,
    ipcMain,
    nativeTheme,
} = require('electron');
const path = require('path');
const nodeConfig = require('../package.json');
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
    ipcMain.on('newWindow', createWindow);

    ipcMain.on('getWindowList', event => {
        let obj = flexBrowserInstances.map(instance => {
            return {
                title: instance.getBrowserView().webContents.getTitle(),
                url: instance.getBrowserView().webContents.getURL(),
                windowId: instance.id,
            };
        });

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

    ipcMain.on('changeUrl', (event, to) => {
        flexBrowserInstances
            .find(i => i.webContents == event.sender)
            .getBrowserView()
            .webContents.loadURL(to);
    });

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

    ipcMain.on('getAllPreferences', event => {
        event.returnValue = readRC();
    });

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

    ipcMain.on('hideTaskbar', event => {
        const instance = flexBrowserInstances.find(
            i => i.webContents == event.sender,
        );
        const browserView = instance.getBrowserView();
        browserView.setBounds({
            x: 0,
            y: 22,
            width: instance.getSize()[0],
            height: instance.getSize()[1] - 22,
        });
    });

    ipcMain.on('showTaskbar', event => {
        const instance = flexBrowserInstances.find(
            i => i.webContents == event.sender,
        );
        const browserView = instance.getBrowserView();
        browserView.setBounds({
            x: 0,
            y: 70,
            width: instance.getSize()[0],
            height: instance.getSize()[1] - 70,
        });
    });
}

/**
 * Creates a new instance of a web browser window.
 *
 */
function createWindow() {
    // @ts-ignore
    const win = new BrowserWindow(browserWindowOptions);

    const config = readRC();

    if ((config.theme || 'dark') === 'dark') nativeTheme.themeSource = 'dark';
    else nativeTheme.themeSource = 'light';

    flexBrowserInstances.push(win);

    win.loadFile('app/loaders/index.html');

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

    win.loadFile('app/loaders/hub.html');

    win.addListener('close', () => {
        hubWindow = null;
    });

    hubWindow = win;
}

function firstStartWindow() {
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

    win.loadFile('app/loaders/first-start.html');
}

function startup() {
    let browserPrefs = readRC();

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
        firstStartWindow();
    } else if (
        browserPrefs.lastSession &&
        browserPrefs.lastSession.version != nodeConfig.version
    ) {
        firstStartWindow();
    } else {
        createHubWindow();
        createWindow();
    }
}

if (app) app.whenReady().then(() => startup());
