import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { StateObject } from '@Hi/Types/states';
import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from 'src/BrowserPreferences';
import { BrowserFramePartition } from 'src/Models/BrowserFrameModel';
import PartitionComponentOrganizer from './PartitionComponentOrganizer';
import PartitionEditor from './PartitionEditor';

export default class PartitionerComponent extends VStack {
    public partitions: BrowserFramePartition[];

    constructor() {
        super(
            new ClickButton(new TextView('Add Partition'))
                .foreground(BrowserPreferences.getPrimaryColor())
                .whenClicked(() => {
                    this.partitions.push({ components: [], padding: 0 });

                    (
                        (
                            (
                                ViewController.getController(
                                    'AppController',
                                ) as ViewController
                            ).screens.frameComposer as HIFullScreenView
                        ).getViewById(
                            'partition-component-organizer',
                        ) as PartitionComponentOrganizer
                    ).addPartition({ components: [], padding: 0 });
                }),

            new VStack().id('partitions').width('100%'),
        );

        this.describe('Partioner').padding().width('100%');

        this.partitions = StateObject([], p => {
            const i = parseInt(p!, 10);
            if (i === this.partitions.length - 1) {
                this.getViewById('partitions')?.addChildren(
                    new PartitionEditor(i + 1),
                );
            }
        });
    }
}
