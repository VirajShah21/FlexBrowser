const { readRC, readHistoryFile, writeHistoryFile } = require('./CoreAccess');
const { nativeTheme, BrowserView, BrowserWindow } = require('electron');
const path = require('path');
const { debug } = require('./ArchLogger');

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

/**
 * Creates a new instance of a web browser window.
 *
 */
function createWindow() {
    debug('Launching window');
    // @ts-ignore
    const win = new BrowserWindow(browserWindowOptions);
    debug('Reading configuration');
    const config = readRC();
    debug('Read configuration');

    if ((config.theme || 'dark') === 'dark') nativeTheme.themeSource = 'dark';
    else nativeTheme.themeSource = 'light';

    win.loadFile('app/loaders/index.html');
    debug('Loaded file');

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
}

exports.createWindow = createWindow;
