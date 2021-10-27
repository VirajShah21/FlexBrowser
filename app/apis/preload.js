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

function brandRegistry(rule, branding) {
    return ipcRenderer.sendSync('brandRegistry', rule, branding);
}

function focusWindow(id) {
    ipcRenderer.send('focusWindow', id);
}

function focusHub() {
    ipcRenderer.send('focusHub');
}

function urlInfo() {
    return ipcRenderer.sendSync('urlInfo');
}

function hideTaskbar() {
    ipcRenderer.send('hideTaskbar');
}

function showTaskbar() {
    ipcRenderer.send('showTaskbar');
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
    brandRegistry,
    focusWindow,
    focusHub,
    urlInfo,
    hideTaskbar,
    showTaskbar,
});