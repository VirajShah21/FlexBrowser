import InputField from './InputField';

export default class TextField extends InputField {
    constructor(placeholder?: string) {
        super(placeholder || '');
        this.body.type = 'text';
    }

    textStart(): this {
        this.body.style.textAlign = 'left';
        return this;
    }

    textCenter(): this {
        this.body.style.textAlign = 'center';
        return this;
    }

    textEnd(): this {
        this.body.style.textAlign = 'right';
        return this;
    }
}
