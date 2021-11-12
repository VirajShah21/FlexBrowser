// During testing, ipcMain is undefined.

const { info, error } = require('./ArchLogger');
const { ipcMain, BrowserWindow, BrowserView } = require('electron');
const {
    readBookmarksFile,
    writeBookmarksFile,
    readRC,
    writeRC,
    readBrandingRegistry,
    writeBrandingRegistry,
} = require('./CoreAccess');
const { focusHubWindow } = require('./FBHub');
const { createWindow } = require('./FBWindow');
const {
    TOP_FRAME_HEIGHT,
    DEFAULT_WINDOW_WIDTH,
    DEFAULT_WINDOW_HEIGHT,
} = require('./constants');
const { warn } = require('console');
const path = require('path');
const keytar = require('keytar');

function findBrowserWindow(event) {
    return BrowserWindow.getAllWindows().find(
        window => window.webContents == event.sender,
    );
}

function logIpcMainEventInvoked(event, name, ...args) {
    const browserWindow = findBrowserWindow(event);

    if (browserWindow) {
        info(`
        Invoked architecture function:
            INVOCATION      ${name}(${args
            .map(arg => JSON.stringify(arg, null, 4))
            .join(' ')})
            EVENT TYPE      ${name}
            WINDOW ID       ${findBrowserWindow(event).id}`);
    } else {
        error(`
        Invoked architecture function:
            INVOCATION      ${name}(${args.map(arg =>
            JSON.stringify(arg, null, 4),
        )})
            EVENT TYPE      ${name}
            WINDOW ID       [ERROR] WINDOW DOES NOT EXIST`);
    }
}

// This guard should not be removed.
if (ipcMain) {
    ipcMain.on('newWindow', event => {
        logIpcMainEventInvoked(event, 'newWindow');
        createWindow();
    });

    ipcMain.on('getWindowList', event => {
        logIpcMainEventInvoked(event, 'getWindowList');

        let obj = BrowserWindow.getAllWindows()
            .filter(win => win.getBrowserView() !== null)
            .map(instance => {
                return {
                    title: instance.getBrowserView().webContents.getTitle(),
                    url: instance.getBrowserView().webContents.getURL(),
                    windowId: instance.id,
                };
            });

        event.returnValue = obj;

        info(
            `Returned the following list of open browser windows:\n${JSON.stringify(
                obj,
                null,
                4,
            )}`,
        );
    });

    ipcMain.on('getBookmarks', event => {
        logIpcMainEventInvoked(event, 'getBookmarks');

        event.returnValue = readBookmarksFile();

        info(
            `Return the following list of bookmarked pages:\n${JSON.stringify(
                event.returnValue,
                null,
                4,
            )}`,
        );
    });

    ipcMain.on('addBookmark', (event, meta) => {
        logIpcMainEventInvoked(event, 'addBookmark', meta);

        let bookmarks = readBookmarksFile();
        if (!bookmarks.find(curr => curr.url == meta.url)) {
            bookmarks.push(meta);
            writeBookmarksFile(bookmarks);
            info(`Successfully added bookmark for: ${meta.url}`);
        } else {
            info(`Bookmark already exists: ${meta.url}`);
        }
    });

    ipcMain.on('removeBookmark', (event, url) => {
        logIpcMainEventInvoked(event, 'removeBookmark', url);

        let bookmarks = readBookmarksFile();
        let filtered = bookmarks.filter(curr => curr.url !== url);
        writeBookmarksFile(filtered);
        info(`Successfully removed bookmark for: ${url}`);
    });

    ipcMain.on('changeUrl', (event, to) => {
        logIpcMainEventInvoked(event, 'changeUrl', to);
        const browserWindow = findBrowserWindow(event);
        let browserView = browserWindow.getBrowserView();

        if (!browserView) {
            browserWindow.setBrowserView(new BrowserView());
            browserView = browserWindow.getBrowserView();
            browserView.setBounds({
                x: 0,
                y: TOP_FRAME_HEIGHT,
                width: browserWindow.getSize()[0],
                height: browserWindow.getSize()[1] - TOP_FRAME_HEIGHT,
            });
        }

        const browserViewContents = browserView.webContents;

        browserViewContents.loadURL(to).catch(err => {
            browserWindow.removeBrowserView(browserView);
            browserWindow.webContents.executeJavaScript(
                `signal('page-load-err', '${err.code}', '${err.url}')`,
            );
        });
        info(`Changed URL for window with ID: ${browserWindow.id}`);
    });

    ipcMain.on('pref', (event, preference, value) => {
        logIpcMainEventInvoked(event, 'pref', preference, value);
        const rc = readRC();
        if (value) {
            rc[preference] = value;
            writeRC(rc);
            info(
                `Changed the value of preference \"${preference}\" to ${JSON.stringify(
                    value,
                    null,
                    4,
                )}`,
            );
            event.returnValue = value;
        } else if (Object.prototype.hasOwnProperty.call(rc, preference)) {
            event.returnValue = rc[preference];
        } else {
            event.returnValue = undefined;
        }
    });

    ipcMain.on('getAllPreferences', event => {
        logIpcMainEventInvoked(event, 'getAllPreferences');
        event.returnValue = readRC();
    });

    ipcMain.on('brandRegistry', (event, rule, branding) => {
        logIpcMainEventInvoked(event, 'brandRegistry', rule, branding);
        const registry = readBrandingRegistry();
        if (rule && branding) {
            registry[rule] = branding;
            writeBrandingRegistry(registry);
            event.returnValue = branding;
        } else if (rule) {
            event.returnValue = registry[rule];
        } else {
            throw new Error('IPC: brandRegistry must provide rule parameter');
        }
    });

    ipcMain.on('focusWindow', (event, id) => {
        logIpcMainEventInvoked(event, 'focusWindow', id);
        const instance = BrowserWindow.getAllWindows().find(
            instance => instance.id == id,
        );

        instance.focus();

        info(`Focused on window with id: ${id}`);
    });

    ipcMain.on('focusHub', event => {
        logIpcMainEventInvoked(event, 'focusHub');
        focusHubWindow();
    });

    ipcMain.on('urlInfo', event => {
        logIpcMainEventInvoked(event, 'urlInfo');
        const instance = findBrowserWindow(event);
        const browserView = instance.getBrowserView();
        event.returnValue = {
            url: browserView.webContents.getURL(),
            title: browserView.webContents.getTitle(),
            windowId: instance.id,
        };
    });

    ipcMain.on('hideTaskbar', event => {
        logIpcMainEventInvoked(event, 'hideTaskbar');
        const instance = findBrowserWindow(event);
        const browserView = instance.getBrowserView();
        browserView.setBounds({
            x: 0,
            y: 20,
            width: instance.getSize()[0],
            height: instance.getSize()[1] - 20,
        });
    });

    ipcMain.on('showTaskbar', event => {
        logIpcMainEventInvoked(event, 'showTaskbar');
        const instance = findBrowserWindow(event);
        const browserView = instance.getBrowserView();
        browserView.setBounds({
            x: 0,
            y: TOP_FRAME_HEIGHT,
            width: instance.getSize()[0],
            height: instance.getSize()[1] - TOP_FRAME_HEIGHT,
        });
    });

    ipcMain.on('setPassword', (event, account, password) => {
        logIpcMainEventInvoked(event, 'savePassword', account, password);
        keytar.setPassword('Flex Browser', account, password);
    });

    ipcMain.on('getPassword', (event, account) => {
        logIpcMainEventInvoked(event, 'getPassword', account);
        event.returnValue = keytar.getPassword('Flex Browser', account);
    });

    ipcMain.on('getAccounts', event => {
        logIpcMainEventInvoked(event, 'getAccounts');
        event.returnValue = keytar.findCredentials('Flex Browser');
    });
}
