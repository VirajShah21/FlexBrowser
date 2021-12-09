import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import View from '@Hi/View';
import BrowserPreferences from '@Models/BrowserPreferences';

/**
 * The default theme for buttons in the app.
 * This class will modify the foreground color of the button to match the
 * theme.
 *
 * @export
 * @class ThemedButton
 * @extends {ClickButton}
 */
export default class ThemedButton extends ClickButton {
    /**
     * Creates an instance of ThemedButton.
     * @param {...View[]} children The children of the button.
     *
     * @memberOf ThemedButton
     */
    constructor(...children: View[]) {
        super(...children);
        this.foreground(HColor(BrowserPreferences.ColorTheme));
    }
}
