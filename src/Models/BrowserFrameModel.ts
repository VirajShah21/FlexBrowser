import { HumanColorName } from '@Hi/Colors';
import { HIEdgeSizingValue, HISizeBounds } from '@Hi/Types/sizing';

export default interface BrowserFrameModel {
    partitions: BrowserFramePartition[];
}

export interface BrowserFramePartition {
    size?: HISizeBounds;
    components: BrowserFrameComponent[];
    padding: HIEdgeSizingValue;
}

export interface BrowserFrameComponent {
    name: string;
    color?: HumanColorName;
    icon?: string;
}
