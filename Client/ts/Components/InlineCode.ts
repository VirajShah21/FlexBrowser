import View from '@Hi/View';

export default class InlineCode extends View {
    public override body: HTMLElement; // ! HTMLCodeElement DOES NOT EXIST !

    constructor(text: string) {
        super('code');
        this.body.innerText = text;
        this.body.style.fontFamily = 'monospace';
    }

    write(text: string): this {
        this.body.innerText += text;
        return this;
    }

    overwrite(text: string): this {
        this.body.innerText = text;
        return this;
    }
}
