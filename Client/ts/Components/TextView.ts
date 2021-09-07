import { HISizingValue, sizing } from '@Hi/Types/sizing';
import { StateObject } from '@Hi/Types/states';
import View from '@Hi/View';

export default class TextView extends View {
    public override body: HTMLSpanElement;

    public readonly model = StateObject(
        {
            text: '',
        },
        () => {
            this.body.textContent = this.model.text;
        }
    );

    constructor(text: string) {
        super('span');
        this.model.text = text;
    }

    lineHeight(height: HISizingValue): this {
        this.body.style.lineHeight = sizing(height);
        return this;
    }

    weight(fontWeight: FontWeight): this {
        this.body.style.fontWeight = `${fontWeight}`;
        return this;
    }
}

export enum FontWeight {
    UltraLight = 100,
    Light = 200,
    DemiLight = 300,
    Regular = 400,
    Medium = 500,
    DemiBold = 600,
    Bold = 700,
    Heavy = 800,
    UltraHeavy = 900,
}
