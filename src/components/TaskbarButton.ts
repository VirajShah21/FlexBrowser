import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import BrowserPreferences from 'src/BrowserPreferences';

export default function TaskbarButton(icon: IonIcon) {
    return new ClickButton(
        icon.foreground(BrowserPreferences.getPrimaryColor())
    )
        .rounded()
        .font('xl')
        .padding(3)
        .whenMouseOver(ev => ev.view.background(HColor('gray3')))
        .whenMouseOut(ev => ev.view.background('none'));
}
