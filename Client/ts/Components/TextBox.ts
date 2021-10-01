import View from '@Hi/View';

export default class TextBox extends View {
    public override body: HTMLTextAreaElement;

    public value: string;

    constructor(placeholder: string) {
        super('textarea');
        this.body.placeholder = placeholder;
        this.body.style.boxSizing = 'border-box';
        this.body.style.resize = 'none';
        this.body.addEventListener('change', () => {
            this.value = this.body.value;
        });
    }
}
