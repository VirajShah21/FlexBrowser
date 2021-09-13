import ClickButton from '@Hi/Components/ClickButton';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import FlexBrowserWindow from 'src/FlexBrowserWindow';

export default class RefreshTaskbarButton extends ClickButton {
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
