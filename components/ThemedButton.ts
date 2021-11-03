import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import View from '@Hi/View';
import BrowserPreferences from '@Models/BrowserPreferences';

export default class ThemedButton extends ClickButton {
    constructor(...children: View[]) {
        super(...children);
        this.foreground(HColor(BrowserPreferences.colorTheme));
    }
}
