import ClickButton from '@Hi/Components/ClickButton';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from '@UI/BrowserPreferences';
import { BrowserFramePartition } from '@UI/Models/BrowserFrameModel';
import PartitionComponentOrganizer from './PartitionComponentOrganizer';

export default class PartitionerComponent extends VStack {
    private partitions: BrowserFramePartition[];

    constructor() {
        super(
            new ClickButton(new TextView('Add Partition'))
                .foreground(BrowserPreferences.getPrimaryColor())
                .whenClicked(() => {
                    this.partitions.push({ components: [], padding: 0 });

                    (
                        ViewController.getController(
                            'AppController',
                        )!.findViewById(
                            'partition-component-organizer',
                        ) as PartitionComponentOrganizer
                    ).addPartition({ components: [], padding: 0 });
                }),

            new VStack().id('partitions').width('100%'),
        );

        this.describe('Partioner').padding().width('100%');

        this.partitions = [];

        // this.partitions = StateObject([], p => {
        //     const i = parseInt(p!, 10);
        //     if (i === this.partitions.length - 1) {
        //         this.getViewById('partitions')?.addChildren(
        //             new PartitionEditor(i + 1),
        //         );
        //     }
        // });
    }
}
