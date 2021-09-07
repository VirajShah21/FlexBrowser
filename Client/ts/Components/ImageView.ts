import { StateObject } from '@Hi/Types/states';
import View from '@Hi/View';

export default class ImageView extends View {
    public override body: HTMLImageElement;
    public model = StateObject(
        {
            source: '',
            altText: '',
        },
        p => {
            if (p == 'source') this.body.src = this.model.source;
            else if (p == 'altText') this.body.alt = this.model.altText;
        }
    );

    constructor(source: string, altText?: string) {
        super('img');
        this.model.source = source;
        if (altText) this.model.altText = altText;
    }
}
