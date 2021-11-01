require('./apis/ArchLogger');
require('./apis/IPCEventBinder');

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const nodeConfig = require('../package.json');
const { info, debug } = require('./apis/ArchLogger');
const { readRC, writeRC } = require('./apis/CoreAccess.js');
const { createHubWindow } = require('./apis/FBHub');
const { createWindow } = require('./apis/FBWindow');

info(
    `Initialized new process with initial configuration:\n${JSON.stringify(
        readRC(),
        null,
        4,
    )}`,
);

function defineAppMenu() {
    let result = Menu.setApplicationMenu(
        Menu.buildFromTemplate([
            /* This is where the template should go */
        ]),
    );
}

function firstStartWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'apis/preload.js'),
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
        debug('Loading hub window');
        createHubWindow();
        debug('Finished loading hub window. Loading browser window now');
        createWindow();
        debug('Finished loading hub window');
    }
}

if (app)
    app.whenReady().then(() => {
        startup();
        defineAppMenu();
    });
