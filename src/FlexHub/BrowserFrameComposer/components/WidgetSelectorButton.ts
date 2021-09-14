import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import BrowserPreferences from 'src/BrowserPreferences';

export default class WidgetSelectorButton extends ClickButton {
    constructor(label: string, icon: IonIcon) {
        super(
            new VStack(
                icon
                    .font('xxl')
                    .foreground(BrowserPreferences.getPrimaryColor()),
                new TextView(label)
                    .font('xs')
                    .foreground(HColor('gray'))
                    .margin({ top: 5 })
            )
        );
        this.rounded()
            .padding()
            .width(100)
            .background(HColor('background'))
            .margin({ right: 10, bottom: 10 });
    }
}
