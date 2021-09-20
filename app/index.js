const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const HOMEDIR = require('os').homedir();

const flexBrowserInstances = [];

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

function readBookmarksFile() {
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
}

function writeBookmarksFile(bookmarks) {
    fs.writeFileSync(
        path.join(HOMEDIR, '.flex-bookmarks.json'),
        JSON.stringify(bookmarks),
    );
}

app.whenReady().then(() => {
    createWindow();
    createHubWindow();
});
