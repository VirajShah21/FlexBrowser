import { HISizingValue, sizing } from '@Hi/Types/sizing';
import View from '@Hi/View';

export default class TextView extends View {
    public override body: HTMLSpanElement;

    constructor(text: string) {
        super('span');
        this.text = text;
    }

    lineHeight(height: HISizingValue): this {
        this.body.style.lineHeight = sizing(height);
        return this;
    }

    weight(fontWeight: FontWeight): this {
        this.body.style.fontWeight = `${fontWeight}`;
        return this;
    }

    textStart(): this {
        this.body.style.textAlign = 'left';
        return this;
    }

    textCenter(): this {
        this.body.style.textAlign = 'center';
        return this;
    }

    textEnd(): this {
        this.body.style.textAlign = 'right';
        return this;
    }

    public get text(): string {
        return this.body.textContent || '';
    }

    public set text(val: string) {
        this.body.textContent = val;
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
