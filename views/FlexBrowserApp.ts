import TextView from '@Hi/Components/TextView';
import { ViewController } from '@Hi/ViewController';
import FirstStartPage from './FirstStartPage';
import FlexBrowserWindow from './FlexBrowserWindow';
import FlexHub from './FlexHub/FlexHub';

let AppController: ViewController;

export function reloadAppController(flexWindow?: string): void {
    AppController = new ViewController('AppController').bind();

    switch (flexWindow) {
        case 'browser':
            AppController.navigateTo(new FlexBrowserWindow());
            break;
        case 'hub':
            AppController.navigateTo(new FlexHub());
            break;
        case 'firstStart':
            AppController.navigateTo(new FirstStartPage());
            break;
        default:
            AppController.navigateTo(
                new TextView('Error loading window: Main process.'),
            );
    }
}

export function getAppController(): ViewController {
    return AppController;
}

reloadAppController(document.body.dataset.window);
