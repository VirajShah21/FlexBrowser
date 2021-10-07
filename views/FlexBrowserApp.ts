import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from './BrowserPreferences';
import FlexBrowserWindow from './FlexBrowserWindow';
import FlexHub from './FlexHub/FlexHub';

let AppController: ViewController;

export function reloadAppController(flexWindow?: string): void {
    AppController = new ViewController('AppController')
        .bind()
        .navigateTo(
            flexWindow === 'browser' ? new FlexBrowserWindow() : new FlexHub(),
        );
}

export function getAppController(): ViewController {
    return AppController;
}

BrowserPreferences.initialize();
reloadAppController('browser');
