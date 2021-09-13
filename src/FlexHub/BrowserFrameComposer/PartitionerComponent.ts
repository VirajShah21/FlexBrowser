import ClickButton from '@Hi/Components/ClickButton';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { StateObject } from '@Hi/Types/states';
import { BrowserFramePartition } from 'src/BrowserFrameModel';
import PartitionEditor from './PartitionEditor';

export default class PartitionerComponent extends VStack {
    public partitions: BrowserFramePartition[];

    constructor() {
        super(
            new ClickButton(new TextView('Add Partition')).whenClicked(ev => {
                this.partitions.push({ components: [], padding: 0 });
            }),

            new VStack().id('partitions').stretchWidth()
        );

        this.describe('Partioner').padding().stretchWidth();

        this.partitions = StateObject([], p => {
            const i = parseInt(p!);
            if (i == this.partitions.length - 1) {
                this.getViewById('partitions')?.addChildren(
                    new PartitionEditor(i + 1)
                );
            }
        });
    }
}
