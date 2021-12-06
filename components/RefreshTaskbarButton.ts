import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import BrowserPreferences from '@Models/BrowserPreferences';

/**
 * The reload button in the URL input bar.
 *
 * @export
 * @class RefreshURLButton
 * @extends {ClickButton}
 */
export default class RefreshURLButton extends ClickButton {
    /**
     * Creates an instance of RefreshURLButton.
     *
     * @memberOf RefreshURLButton
     */
    constructor() {
        super(new IonIcon('reload').id('url-refresh-button'));
        this.padding(0)
            .font('md')
            .foreground(HColor('gray'))
            .whenClicked(() => flexarch.reloadBrowserView())
            .whenMouseOver(ev =>
                ev.view.foreground(HColor(BrowserPreferences.ColorTheme)),
            )
            .whenMouseOut(ev => ev.view.foreground(HColor('gray')));
    }
}
