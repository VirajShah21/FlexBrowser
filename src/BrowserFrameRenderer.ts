import HStack from '@Hi/Components/HStack';
import BrowserFrameModel, {
    BrowserFramePartition,
} from './Models/BrowserFrameModel';

/**
 * The base class for all renderers of the `BrowserFrameModel`.
 *
 * @class BrowserFrameRenderer
 * @extends {HStack}
 */
export default abstract class BrowserFrameRenderer extends HStack {
    protected model: BrowserFrameModel;

    constructor(model: BrowserFrameModel) {
        super();
        this.model = model;
        this.updateBrowserFrame();
    }

    /**
     * Adds a partition to the renderer.
     *
     * @param {BrowserFramePartition} partition The partition object to add.
     *
     * @memberOf BrowserFrameRenderer
     */
    public addPartition(partition: BrowserFramePartition): void {
        this.model.partitions.push(partition);
        this.updateBrowserFrame();
    }

    /**
     * Assigns the entire frame model to the one provided.
     *
     * @param {BrowserFrameModel} model The model to overwrite the current model with.
     *
     * @memberOf BrowserFrameRenderer
     */
    public setBrowserFrameModel(model: BrowserFrameModel): void {
        this.model = model;
        this.updateBrowserFrame();
    }

    /**
     * Should update the browser frame to correspond to the model.
     *
     * @protected
     * @abstract
     *
     * @memberOf BrowserFrameRenderer
     */
    protected abstract updateBrowserFrame(): void;
}
