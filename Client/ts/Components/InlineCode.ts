import View from '@Hi/View';

export default class InlineCode extends View {
    public override body: HTMLElement; // ! HTMLCodeElement DOES NOT EXIST !

    private code: string;

    constructor(text: string) {
        super('code');
        this.write(text);
        this.body.innerText = text;
        this.body.style.fontFamily = 'monospace';
    }

    append(text: string): this {
        this.code += text;
        this.body.innerText += this.code;
        return this;
    }

    write(text: string): this {
        this.code += text;
        this.body.innerText = this.code;
        return this;
    }
}
