import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from './BrowserPreferences';
import FlexBrowserWindow from './FlexBrowserWindow';
import BrowserFrameComposer from './FlexHub/BrowserFrameComposer/BrowserFrameComposer';
import FlexHub from './FlexHub/FlexHub';
import FlexPreferences from './FlexHub/FlexPreferences';
import FlexWindowsViewer from './FlexHub/FlexWindowsViewer';

BrowserPreferences.initialize();

const flexWindow = document.body.dataset.window;

new ViewController({
    browser: new FlexBrowserWindow(),
    hub: new FlexHub(),
    preferences: new FlexPreferences(),
    windows: new FlexWindowsViewer(),
    frameComposer: new BrowserFrameComposer(),
})
    .bind()
    .navigateTo(flexWindow || 'browser')
    .mapTo('AppController');
