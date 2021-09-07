const { contextBridge, ipcRenderer } = require('electron');

function changeUrl(to) {
    ipcRenderer.send('changeUrl', to);
}

function newWindow() {
    ipcRenderer.send('newWindow');
}

function getWindowList() {
    ipcRenderer.send('getWindowList');
}

function fillWindowList(list) {
    windowList.splice(0, windowList.length);
    list.forEach(item => windowList.push(item));
}

const windowList = [];

contextBridge.exposeInMainWorld('flexarch', {
    changeUrl,
    newWindow,
    getWindowList,
    fillWindowList,
    windowList,
});
