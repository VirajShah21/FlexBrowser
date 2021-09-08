const { contextBridge, ipcRenderer } = require('electron');

function changeUrl(to) {
    ipcRenderer.send('changeUrl', to);
}

function newWindow() {
    ipcRenderer.send('newWindow');
}

function getWindowList() {
    return ipcRenderer.sendSync('getWindowList');
}

contextBridge.exposeInMainWorld('flexarch', {
    changeUrl,
    newWindow,
    getWindowList,
});
