import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import View from '@Hi/View';
import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from 'src/BrowserPreferences';
import { BrowserFrameComponent } from 'src/Models/BrowserFrameModel';
import PartitionComponentOrganizer from '../PartitionComponentOrganizer';

export default class WidgetSelectorButton extends ClickButton {
    constructor(
        label: string,
        componentPlaceholder: View,
        partition: number,
        index: number,
        componentName: string
    ) {
        super(
            new VStack(
                componentPlaceholder
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
            .margin({ right: 10, bottom: 10 })
            .whenClicked(ev => {
                const renderer = ViewController.getController(
                    'AppController'
                )!.screens.frameComposer.getViewById(
                    'partition-component-organizer'
                ) as PartitionComponentOrganizer;
                console.log(renderer);
                renderer.addToPartition(partition, index, {
                    name: componentName,
                });
                ev.view.root().destroy();
            });
    }
}
