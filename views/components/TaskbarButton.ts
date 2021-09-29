import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import BrowserPreferences from '@UI/BrowserPreferences';

export default abstract class TaskbarButton extends ClickButton {
    constructor(icon: IonIcon) {
        super(icon.foreground(BrowserPreferences.getPrimaryColor()));

        this.rounded()
            .font('xl')
            .padding(3)
            .whenMouseOver(ev => ev.view.background(HColor('gray3')))
            .whenMouseOut(ev => ev.view.background('none'));
    }
}
