import { HumanColorName } from '@Hi/Types/colors';
import { HIEdgeSizingValue, HISizeBounds } from '@Hi/Types/sizing';

/**
 * The interface containing browser frame rendering information.
 *
 * @export
 * @interface BrowserFrameModel
 */
export default interface BrowserFrameModel {
    partitions: BrowserFramePartition[];
}

/**
 * An interface which requires browser-frame partition information.
 * Required values are components and padding. Size is optional.
 * If no value is provided for size, it will automatically grow
 * and shrink.
 *
 * @export
 * @interface BrowserFramePartition
 */
export interface BrowserFramePartition {
    size?: HISizeBounds;
    components: BrowserFrameComponent[];
    padding: HIEdgeSizingValue;
}

/**
 * An interface requiring information for browser frame components.
 *
 * @export
 * @interface BrowserFrameComponent
 */
export interface BrowserFrameComponent {
    name: string;
    color?: HumanColorName;
    icon?: string;
}
