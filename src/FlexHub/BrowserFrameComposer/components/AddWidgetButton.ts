import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Overlay from '@Hi/Components/Overlay';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import BrowserPreferences from 'src/BrowserPreferences';
import WidgetSelectorButton from './WidgetSelectorButton';

export default class AddWidgetButton extends ClickButton {
    constructor() {
        super(new IonIcon('hammer'));

        this.foreground(BrowserPreferences.getPrimaryColor()).whenClicked(
            () => {
                new Overlay(
                    new VStack(
                        new Spacer(),

                        new HStack(
                            new WidgetSelectorButton(
                                'Back Page',
                                new IonIcon('chevron-back-circle-outline')
                            ),
                            new WidgetSelectorButton(
                                'Forward Page',
                                new IonIcon('chevron-forward-circle-outline')
                            ),
                            new WidgetSelectorButton(
                                'New Window',
                                new IonIcon('add-circle-outline')
                            )
                        ),

                        new Spacer(),

                        new ClickButton(new TextView('Cancel'))
                            .background(HColor('red'))
                            .foreground(HColor('background'))
                            .rounded(7.5)
                            .whenClicked(ev => {
                                ev.view.root().destroy();
                            }),

                        new Spacer()
                    ).stretch()
                )
                    .background(HColor('gray5'))
                    .foreground(HColor('foreground'));
            }
        );
    }
}
