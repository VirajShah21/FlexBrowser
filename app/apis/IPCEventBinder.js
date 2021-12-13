// During testing, ipcMain is undefined.

const { info, error, warn, debug } = require('./ArchLogger');
const { ipcMain, BrowserWindow, BrowserView } = require('electron');
const {
    readBookmarksFile,
    writeBookmarksFile,
    readRC,
    writeRC,
    readBrandingRegistry,
    writeBrandingRegistry,
    readHistoryFile,
} = require('./CoreAccess');
const { focusHubWindow } = require('./FBHub');
const { createWindow } = require('./FBWindow');
const {
    TOP_FRAME_HEIGHT,
    DEFAULT_WINDOW_WIDTH,
    DEFAULT_WINDOW_HEIGHT,
} = require('./constants');
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
    const startTime = Date.now();
    return {
        logRuntime: () => {
            const now = Date.now();
            info(`
            Completed architecture function:
                COMPLETED       ${name}(${args.map(arg =>
                JSON.stringify(arg, null, 4),
            )})
                RUNTIME         ${now - startTime} ms`);
        },
    };
}

// This guard should not be removed.
if (ipcMain) {
    ipcMain.on('newWindow', event => {
        const timer = logIpcMainEventInvoked(event, 'newWindow');
        createWindow();
        timer.logRuntime();
    });

    ipcMain.on('getWindowList', event => {
        const timer = logIpcMainEventInvoked(event, 'getWindowList');

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

        timer.logRuntime();
    });

    ipcMain.on('getBookmarks', event => {
        const timer = logIpcMainEventInvoked(event, 'getBookmarks');

        event.returnValue = readBookmarksFile();

        info(
            `Return the following list of bookmarked pages:\n${JSON.stringify(
                event.returnValue,
                null,
                4,
            )}`,
        );

        timer.logRuntime();
    });

    ipcMain.on('addBookmark', (event, meta) => {
        const timer = logIpcMainEventInvoked(event, 'addBookmark', meta);

        let bookmarks = readBookmarksFile();
        if (!bookmarks.find(curr => curr.url == meta.url)) {
            bookmarks.push(meta);
            writeBookmarksFile(bookmarks);
            info(`Successfully added bookmark for: ${meta.url}`);
        } else {
            info(`Bookmark already exists: ${meta.url}`);
        }

        timer.logRuntime();
    });

    ipcMain.on('removeBookmark', (event, url) => {
        const timer = logIpcMainEventInvoked(event, 'removeBookmark', url);

        let bookmarks = readBookmarksFile();
        let filtered = bookmarks.filter(curr => curr.url !== url);

        writeBookmarksFile(filtered);
        info(`Successfully removed bookmark for: ${url}`);

        timer.logRuntime();
    });

    ipcMain.on('changeUrl', (event, to) => {
        const timer = logIpcMainEventInvoked(event, 'changeUrl', to);

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

        timer.logRuntime();
    });

    ipcMain.on('pref', (event, preference, value) => {
        const timer = logIpcMainEventInvoked(event, 'pref', preference, value);
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

        timer.logRuntime();
    });

    ipcMain.on('getAllPreferences', event => {
        const timer = logIpcMainEventInvoked(event, 'getAllPreferences');
        event.returnValue = readRC();
        timer.logRuntime();
    });

    ipcMain.on('brandRegistry', (event, rule, branding) => {
        const timer = logIpcMainEventInvoked(
            event,
            'brandRegistry',
            rule,
            branding,
        );
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
        timer.logRuntime();
    });

    ipcMain.on('focusWindow', (event, id) => {
        const timer = logIpcMainEventInvoked(event, 'focusWindow', id);
        const instance = BrowserWindow.getAllWindows().find(
            instance => instance.id == id,
        );

        instance.focus();

        info(`Focused on window with id: ${id}`);

        timer.logRuntime();
    });

    ipcMain.on('focusHub', event => {
        const timer = logIpcMainEventInvoked(event, 'focusHub');
        focusHubWindow();
        timer.logRuntime();
    });

    ipcMain.on('urlInfo', event => {
        const timer = logIpcMainEventInvoked(event, 'urlInfo');
        const instance = findBrowserWindow(event);
        const browserView = instance.getBrowserView();
        event.returnValue = {
            url: browserView.webContents.getURL(),
            title: browserView.webContents.getTitle(),
            windowId: instance.id,
        };
        timer.logRuntime();
    });

    ipcMain.on('hideTaskbar', event => {
        const timer = logIpcMainEventInvoked(event, 'hideTaskbar');
        const instance = findBrowserWindow(event);
        const browserView = instance.getBrowserView();
        browserView.setBounds({
            x: 0,
            y: 20,
            width: instance.getSize()[0],
            height: instance.getSize()[1] - 20,
        });
        timer.logRuntime();
    });

    ipcMain.on('showTaskbar', event => {
        const timer = logIpcMainEventInvoked(event, 'showTaskbar');
        const instance = findBrowserWindow(event);
        const browserView = instance.getBrowserView();
        browserView.setBounds({
            x: 0,
            y: TOP_FRAME_HEIGHT,
            width: instance.getSize()[0],
            height: instance.getSize()[1] - TOP_FRAME_HEIGHT,
        });
        timer.logRuntime();
    });

    ipcMain.handle('setPassword', async (event, account, password) => {
        const timer = logIpcMainEventInvoked(
            event,
            'savePassword',
            account,
            password,
        );
        keytar.setPassword('Flex Browser', account, password);
        timer.logRuntime();
    });

    ipcMain.handle('getPassword', async (event, account) => {
        return new Promise((resolve, reject) => {
            const timer = logIpcMainEventInvoked(event, 'getPassword', account);
            keytar
                .getPassword('Flex Browser', account)
                .then(password => {
                    resolve(password);
                    timer.logRuntime();
                })
                .catch(err => reject(err));
        });
    });

    ipcMain.handle('getAccounts', async event => {
        return new Promise((resolve, reject) => {
            const timer = logIpcMainEventInvoked(event, 'getAccounts');
            keytar.findCredentials('Flex Browser').then(accounts => {
                resolve(accounts);
                timer.logRuntime();
            });
        });
    });

    ipcMain.handle('reloadBrowserView', event => {
        const timer = logIpcMainEventInvoked(event, 'reloadBrowserView');
        const instance = findBrowserWindow(event);
        const browserView = instance.getBrowserView();
        browserView.webContents.reload();
        timer.logRuntime();
    });

    ipcMain.handle('getHistory', event => {
        const timer = logIpcMainEventInvoked(event, 'getHistory');
        const historyFile = readHistoryFile();
        timer.logRuntime();
        return historyFile;
    });

    ipcMain.handle('log', (event, logType, message) => {
        const timer = logIpcMainEventInvoked(event, 'log', logType, message);
        if (logType === 0) {
            info(message);
        } else if (logType === 1) {
            warn(message);
        } else if (logType === 2) {
            error(message);
        } else if (logType === 3) {
            debug(message);
        } else {
            info(message);
        }
        timer.logRuntime();
    });
}
