import HumanEvent from '@Hi/Types/HumanEvent';
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

    public whenLoaded(callback: (ev: HumanEvent) => void): this {
        this.body.addEventListener('load', browserEvent => {
            callback({
                type: 'Load',
                view: this,
                browserEvent,
            });
        });
        return this;
    }

    public whenError(callback: (ev: HumanEvent) => void): this {
        this.body.addEventListener('error', browserEvent => {
            callback({ type: 'Error', view: this, browserEvent });
        });
        return this;
    }
}
