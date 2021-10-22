import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import BrowserPreferences from '@Models/BrowserPreferences';
import FlexBrowserWindow from '@UI/FlexBrowserWindow';

export default class RefreshURLButton extends ClickButton {
    constructor() {
        super(new IonIcon('reload').id('url-refresh-button'));
        this.padding(0)
            .font('md')
            .foreground(HColor('gray'))
            .whenClicked(ev => {
                const browserWindow = ev.view.root(
                    view => (view as FlexBrowserWindow).isBrowserWindow,
                ) as FlexBrowserWindow;
                const url = (browserWindow.findViewById('url') as InputField)
                    .value;

                browserWindow.goTo(url);
            })
            .whenMouseOver(ev =>
                ev.view.foreground(HColor(BrowserPreferences.colorTheme)),
            )
            .whenMouseOut(ev => ev.view.foreground(HColor('gray')));
    }
}
