import { StateObject } from '@Hi/Types/states';
import View from '@Hi/View';

export default class BlockCode extends View {
    public override body: HTMLPreElement;
    public model = StateObject(
        {
            code: '',
        },
        () => {
            this.body.innerText = this.model.code;
        }
    );

    constructor(text: string) {
        super('pre');
        this.model.code = text;
        this.body.style.fontFamily = 'monospace';
    }

    write(text: string): this {
        this.model.code += text;
        return this;
    }

    overwrite(text: string): this {
        this.model.code = text;
        return this;
    }
}
