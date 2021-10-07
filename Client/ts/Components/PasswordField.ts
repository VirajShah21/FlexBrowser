import InputField from './InputField';

export default class PasswordField extends InputField {
    constructor() {
        super('Password');
        this.body.type = 'password';
        this.addClass('hi-passwordfield');
    }
}
