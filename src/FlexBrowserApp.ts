import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from './BrowserPreferences';
import FlexBrowserWindow from './FlexBrowserWindow';
import FlexHub from './FlexHub';
import FlexPreferences from './FlexPreferences';
import FlexWindowsViewer from './FlexWindowsViewer';

BrowserPreferences.initialize();

const flexWindow = document.body.dataset.window;
console.log(flexWindow);

new ViewController({
    browser: new FlexBrowserWindow(),
    hub: new FlexHub(),
    preferences: new FlexPreferences(),
    windows: new FlexWindowsViewer(),
})
    .bind()
    .navigateTo(flexWindow || 'browser')
    .mapTo(`AppController`);
