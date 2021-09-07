import { StateObject } from '@Hi/Types/states';
import View from '@Hi/View';

export default class Hyperlink extends View {
    public readonly text = StateObject(
        {
            value: '',
        },
        () => {
            this.body.textContent = this.text.value;
        }
    );

    constructor(text: string) {
        super('a');
        this.text.value = text;
    }
}
