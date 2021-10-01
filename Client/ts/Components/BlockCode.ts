import View from '@Hi/View';

export default class BlockCode extends View {
    public override body: HTMLPreElement;

    private code: string;

    constructor(text: string) {
        super('pre');
        this.write(text);
        this.body.style.fontFamily = 'monospace';
    }

    append(text: string): this {
        this.code += text;
        this.body.innerText = this.code;
        return this;
    }

    write(text: string): this {
        this.code = text;
        this.body.innerText = this.code;
        return this;
    }
}
