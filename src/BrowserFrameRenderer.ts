import HStack from '@Hi/Components/HStack';
import BrowserFrameModel, { BrowserFramePartition } from './BrowserFrameModel';

export default abstract class BrowserFrameRenderer extends HStack {
    protected model: BrowserFrameModel;

    constructor(model: BrowserFrameModel) {
        super();
        this.model = model;
        this.updateBrowserFrame();
    }

    public addPartition(partition: BrowserFramePartition): void {
        this.model.partitions.push(partition);
        this.updateBrowserFrame();
    }

    public setBrowserFrameModel(model: BrowserFrameModel): void {
        this.model = model;
        this.updateBrowserFrame();
    }

    protected abstract updateBrowserFrame(): void;
}
