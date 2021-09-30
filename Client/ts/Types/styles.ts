import RGBAModel from '../RGBAModel';
import { HISizingValue } from './sizing';

export type HIBorderProperties = {
    size?: number;
    style?: string;
    color?: RGBAModel;
};
export type HIFont = {
    family?: string;
    size?: HISizingValue;
    color?: RGBAModel;
};
