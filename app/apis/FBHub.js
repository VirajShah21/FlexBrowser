const { BrowserWindow } = require('electron');
const path = require('path');

exports.hubWindow = null;

/**
 * Creates an instance of a hub window.
 *
 */
exports.createHubWindow = function createHubWindow() {
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
        exports.hubWindow = null;
    });

    exports.hubWindow = win;
};
