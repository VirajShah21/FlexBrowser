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

function getBookmarks() {
    return ipcRenderer.sendSync('getBookmarks');
}

function addBookmark(urlMeta) {
    ipcRenderer.send('addBookmark', urlMeta);
}

contextBridge.exposeInMainWorld('flexarch', {
    changeUrl,
    newWindow,
    getWindowList,
    getBookmarks,
    addBookmark,
});