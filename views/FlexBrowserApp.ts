import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from './BrowserPreferences';
import FirstStartPage from './FirstStartPage';
import FlexBrowserWindow from './FlexBrowserWindow';
import BrowserFrameComposer from './FlexHub/BrowserFrameComposer/BrowserFrameComposer';
import FlexBookmarksViewer from './FlexHub/FlexBookmarksViewer';
import FlexHub from './FlexHub/FlexHub';
import FlexPreferences from './FlexHub/FlexPreferences';
import FlexWindowsViewer from './FlexHub/FlexWindowsViewer';

let AppController: ViewController;

export function reloadAppController(flexWindow = 'browser'): void {
    AppController = new ViewController({
        browser: new FlexBrowserWindow(),
        hub: new FlexHub(),
        preferences: new FlexPreferences(),
        windows: new FlexWindowsViewer(),
        frameComposer: new BrowserFrameComposer(),
        bookmarks: new FlexBookmarksViewer(),
        firstStart: new FirstStartPage(),
    })
        .bind()
        .navigateTo(flexWindow)
        .mapTo('AppController');
}

export function getAppController(): ViewController {
    return AppController;
}

BrowserPreferences.initialize();
reloadAppController();
