import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import FlexBrowserWindow from 'src/FlexBrowserWindow';
import TaskbarButton from './TaskbarButton';

export default class RefreshTaskbarButton extends TaskbarButton {
    constructor() {
        super(new IonIcon('refresh-circle-outline').id('url-refresh-button'));
        this.whenClicked(ev => {
            const browserWindow = ev.view.root(
                view => (view as FlexBrowserWindow).isBrowserWindow
            ) as FlexBrowserWindow;
            const url = (browserWindow.getViewById('url') as InputField).model
                .value;

            browserWindow.goTo(url);
        });
    }
}
