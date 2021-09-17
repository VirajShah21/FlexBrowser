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

    ipcMain.on('addBookmark', (event, meta) => {
        event.returnValue = new Promise((resolve, reject) => {
            readBookmarksFile()
                .then(bookmarks => {
                    bookmarks.push(meta);
                    writeBookmarksFile(bookmarks).then(() => resolve());
                })
                .catch(reason => reject(reason));
        });
    });

    ipcMain.on('getBookmarks', event => {
        readBookmarksFile()
            .then(bookmarks => (event.returnValue = bookmarks))
            .catch(reason => console.warn(reason));
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

async function readBookmarksFile() {
    return new Promise((resolve, reject) => {
        const filepath = path.join(HOMEDIR, '.flex-bookmarks.json');
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) fs.writeFile(filepath, '{}', () => resolve({}));
            else {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject('File (~/.flex-bookmarks.json) is invalid JSON.');
                }
            }
        });
    });
}

async function writeBookmarksFile(bookmarks) {
    return new Promise((resolve, reject) => {
        const filepath = path.join(HOMEDIR, '.flex-bookmarks.json');
        fs.writeFile(filepath, JSON.stringify(bookmarks), err => {
            if (err) reject(err);
            else resolve();
        });
    });
}

app.whenReady().then(() => {
    createWindow();
    createHubWindow();
});
