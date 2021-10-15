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

function addBookmark(meta) {
    ipcRenderer.send('addBookmark', meta);
}

function pref(property, value) {
    return ipcRenderer.sendSync('pref', property, value);
}

function getAllPreferences() {
    return ipcRenderer.sendSync('getAllPreferences');
}

contextBridge.exposeInMainWorld('flexarch', {
    changeUrl,
    newWindow,
    getWindowList,
    Bookmarks: [],
    getBookmarks,
    addBookmark,
    pref,
    getAllPreferences,
});
