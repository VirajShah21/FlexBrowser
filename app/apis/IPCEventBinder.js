// During testing, ipcMain is undefined.

const { info, error } = require('./ArchLogger');
const { ipcMain, BrowserWindow } = require('electron');
const {
    readBookmarksFile,
    writeBookmarksFile,
    readRC,
    writeRC,
    readBrandingRegistry,
    writeBrandingRegistry,
} = require('./CoreAccess');
const { createHubWindow, hubWindow } = require('./FBHub');
const { createWindow } = require('./FBWindow');
const { electron } = require('webpack');

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
        logIpcMainEventInvoked(event);
        createWindow();
    });

    ipcMain.on('getWindowList', event => {
        logIpcMainEventInvoked(event);

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
        logIpcMainEventInvoked();

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
        logIpcMainEventInvoked(event, meta);

        let bookmarks = readBookmarksFile();
        if (!bookmarks.filter(curr => curr.url == meta.url)) {
            bookmarks.push(meta);
            writeBookmarksFile(bookmarks);
            info(`Successfully added bookmark for: ${meta.url}`);
        } else {
            info(`Bookmark already exists: ${meta.url}`);
        }
    });

    ipcMain.on('changeUrl', (event, to) => {
        logIpcMainEventInvoked(event, to);
        const browserWindow = findBrowserWindow(event);
        browserWindow.getBrowserView().webContents.loadURL(to);
        info(`Changed URL for window with ID: ${browserWindow.id}`);
    });

    ipcMain.on('pref', (event, preference, value) => {
        logIpcMainEventInvoked(event, preference, value);
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
            return value;
        } else if (Object.prototype.hasOwnProperty.call(rc, preference)) {
            event.returnValue = rc[preference];
        } else {
            event.returnValue = undefined;
        }
    });

    ipcMain.on('getAllPreferences', event => {
        logIpcMainEventInvoked(event);
        event.returnValue = readRC();
    });

    ipcMain.on('brandRegistry', (event, rule, branding) => {
        logIpcMainEventInvoked(event, rule, branding);
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
        logIpcMainEventInvoked(event, id);
        const instance = BrowserWindow.getAllWindows().find(
            instance => instance.id == id,
        );

        instance.focus();

        info(`Focused on window with id: ${id}`);
    });

    ipcMain.on('focusHub', event => {
        logIpcMainEventInvoked(event);

        if (hubWindow === null) createHubWindow();

        // @ts-ignore
        hubWindow.focus();
    });

    ipcMain.on('urlInfo', event => {
        logIpcMainEventInvoked(event);
        const instance = findBrowserWindow(event);
        const browserView = instance.getBrowserView();
        event.returnValue = {
            url: browserView.webContents.getURL(),
            title: browserView.webContents.getTitle(),
            windowId: instance.id,
        };
    });

    ipcMain.on('hideTaskbar', event => {
        logIpcMainEventInvoked(event);
        const instance = findBrowserWindow(event);
        const browserView = instance.getBrowserView();
        browserView.setBounds({
            x: 0,
            y: 22,
            width: instance.getSize()[0],
            height: instance.getSize()[1] - 22,
        });
    });

    ipcMain.on('showTaskbar', event => {
        logIpcMainEventInvoked(event);
        const instance = findBrowserWindow(event);
        const browserView = instance.getBrowserView();
        browserView.setBounds({
            x: 0,
            y: 70,
            width: instance.getSize()[0],
            height: instance.getSize()[1] - 70,
        });
    });
}
