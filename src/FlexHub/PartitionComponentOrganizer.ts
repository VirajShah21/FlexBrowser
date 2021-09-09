import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Overlay from '@Hi/Components/Overlay';
import TextView from '@Hi/Components/TextView';
import BrowserPreferences from 'src/BrowserPreferences';

export default class PartitionComponentOrganizer extends HStack {
    constructor() {
        super(
            new ClickButton(new IonIcon('hammer')).whenClicked(() => {
                new Overlay(
                    new HStack(
                        new ClickButton(
                            new IonIcon('back').foreground(
                                BrowserPreferences.getPrimaryColor()
                            )
                        )
                            .padding()
                            .background(HColor('background').alpha(0.5))
                    ).stretch()
                ).background(HColor('background').alpha(0.5));
            })
        );

        this.background(HColor('gray5')).rounded().padding();
    }
}
