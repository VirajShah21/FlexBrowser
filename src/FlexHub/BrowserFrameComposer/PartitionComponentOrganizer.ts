import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Overlay from '@Hi/Components/Overlay';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import BrowserFrameModel from 'src/BrowserFrameModel';
import BrowserFrameRenderer from 'src/BrowserFrameRenderer';
import BrowserPreferences from 'src/BrowserPreferences';

export default class PartitionComponentOrganizer extends BrowserFrameRenderer {
    constructor(model: BrowserFrameModel) {
        super(model);

        this.background(HColor('gray5')).rounded().padding();
    }

    protected override updateBrowserFrame(): void {
        this.removeAllChildren().addChildren(
            ...this.model.partitions.map(partition =>
                new HStack(
                    ...(partition.components.length == 0
                        ? [AddWidgetButton()]
                        : partition.components.map(component =>
                              new IonIcon(component.icon || '').foreground(
                                  BrowserPreferences.getPrimaryColor()
                              )
                          ))
                ).width(partition.size || 'auto')
            )
        );
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

function AddWidgetButton(): ClickButton {
    return new ClickButton(new IonIcon('hammer')).whenClicked(() => {
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
    });
}
