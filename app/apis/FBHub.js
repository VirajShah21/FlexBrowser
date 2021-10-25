const { BrowserWindow } = require('electron');
const path = require('path');

let hubWindow = null;
exports.hubWindow = hubWindow;

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

exports.createHubWindow = createHubWindow;
