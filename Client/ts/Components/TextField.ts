import InputField from './InputField';

export default class TextField extends InputField {
    constructor(placeholder?: string) {
        super(placeholder || '');
        this.body.type = 'text';
        this.addClass('hi-textfield');
    }
}
