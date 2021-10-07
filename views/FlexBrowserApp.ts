import View from '@Hi/View';
import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from './BrowserPreferences';
import FlexBrowserWindow from './FlexBrowserWindow';

let AppController: ViewController;

export function reloadAppController(flexWindow?: View): void {
    AppController = new ViewController('AppController')
        .bind()
        .navigateTo(flexWindow || new FlexBrowserWindow());
}

export function getAppController(): ViewController {
    return AppController;
}

BrowserPreferences.initialize();
reloadAppController();
