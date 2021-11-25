import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import BrowserPreferences from '@Models/BrowserPreferences';

export default class RefreshURLButton extends ClickButton {
    constructor() {
        super(new IonIcon('reload').id('url-refresh-button'));
        this.padding(0)
            .font('md')
            .foreground(HColor('gray'))
            .whenClicked(() => flexarch.reloadBrowserView())
            .whenMouseOver(ev =>
                ev.view.foreground(HColor(BrowserPreferences.colorTheme)),
            )
            .whenMouseOut(ev => ev.view.foreground(HColor('gray')));
    }
}
