import View from '@Hi/View';

export default class IonIcon extends View {
    constructor(name: string) {
        super('ion-icon');
        this.body.setAttribute('name', name);
    }
}
