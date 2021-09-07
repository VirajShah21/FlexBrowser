import InputField from './InputField';

export default class PasswordField extends InputField {
    constructor() {
        super('Password');
        this.body.type = 'password';
        this.addClass('hi-passwordfield');
    }

    placeholder(newPlaceholder: string): this {
        this.body.placeholder = newPlaceholder;
        return this;
    }
}
