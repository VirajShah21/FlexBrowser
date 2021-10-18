import View from '@Hi/View';

export default class IonIcon extends View {
    constructor(name: string) {
        super('ion-icon');
        this.name = name;
    }

    public get name(): string {
        return this.body.getAttribute('name') || '';
    }

    public set name(value: string) {
        this.body.setAttribute('name', value);
    }
}
