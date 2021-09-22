import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import View from '@Hi/View';
import { ViewController } from '@Hi/ViewController';
import BrowserFrameRenderer from 'src/BrowserFrameRenderer';
import BrowserPreferences from 'src/BrowserPreferences';

export default class WidgetSelectorButton extends ClickButton {
    constructor(
        label: string,
        componentPlaceholder: View,
        partition: number,
        index: number,
        componentName: string,
    ) {
        super(
            new VStack(
                componentPlaceholder
                    .font('xxl')
                    .foreground(BrowserPreferences.getPrimaryColor()),
                new TextView(label)
                    .font('xs')
                    .foreground(HColor('gray'))
                    .margin({ top: 5 }),
            ),
        );
        this.rounded()
            .padding()
            .width(100)
            .background(HColor('background'))
            .margin({ right: 10, bottom: 10 })
            .whenClicked(ev => {
                const renderer = (
                    (
                        ViewController.getController(
                            'AppController',
                        ) as ViewController
                    ).screens.frameComposer as HIFullScreenView
                ).getViewById(
                    'partition-component-organizer',
                ) as BrowserFrameRenderer;

                renderer.addToPartition(partition, index, {
                    name: componentName,
                });
                ev.view.root().destroy();
            });
    }
}
