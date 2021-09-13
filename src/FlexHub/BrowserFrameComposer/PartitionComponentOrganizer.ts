import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Overlay from '@Hi/Components/Overlay';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import BrowserPreferences from 'src/BrowserPreferences';

export default class PartitionComponentOrganizer extends HStack {
    constructor() {
        super(
            new ClickButton(new IonIcon('hammer')).whenClicked(() => {
                new Overlay(
                    new VStack(
                        new Spacer(),

                        new HStack(
                            WidgetSelectorButton(
                                'Back Page',
                                new IonIcon('chevron-back-circle-outline')
                            ),
                            WidgetSelectorButton(
                                'Forward Page',
                                new IonIcon('chevron-forward-circle-outline')
                            ),
                            WidgetSelectorButton(
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
            })
        );

        this.background(HColor('gray5')).rounded().padding();
    }
}

function WidgetSelectorButton(label: string, icon: IonIcon): ClickButton {
    return new ClickButton(
        new VStack(
            icon.font('xxl').foreground(BrowserPreferences.getPrimaryColor()),
            new TextView(label)
                .font('xs')
                .foreground(HColor('gray'))
                .margin({ top: 5 })
        )
    )
        .rounded()
        .padding()
        .width(100)
        .background(HColor('background'))
        .margin({ right: 10, bottom: 10 });
}
