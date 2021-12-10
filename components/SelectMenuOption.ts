import View from '@Hi/View';

export default class SelectMenuOption extends View<HTMLOptionElement> {
    constructor(label: string, value: string) {
        super('option');
        this.label = label;
        this.value = value;
    }

    public get label(): string {
        return this.body.textContent ?? '';
    }

    public set label(value: string) {
        this.body.textContent = value;
    }

    public get value(): string {
        return this.body.value ?? '';
    }

    public set value(value: string) {
        this.body.value = value;
    }
}
