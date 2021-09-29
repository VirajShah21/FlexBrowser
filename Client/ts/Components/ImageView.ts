import View from '@Hi/View';

export default class ImageView extends View {
    public override body: HTMLImageElement;

    constructor(source: string, altText?: string) {
        super('img');
        this.source = source;
        if (altText) this.altText = altText;
    }

    public get source(): string {
        return this.body.src;
    }

    public set source(val: string) {
        this.body.src = val;
    }

    public get altText(): string {
        return this.body.alt;
    }

    public set altText(val: string) {
        this.body.alt = val;
    }
}
