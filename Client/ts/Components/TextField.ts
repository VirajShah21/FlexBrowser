import { HColor } from '@Hi/Colors';
import InputField from './InputField';

export default class TextField extends InputField {
    constructor(placeholder?: string) {
        super(placeholder || '');
        this.body.type = 'text';
    }
}
