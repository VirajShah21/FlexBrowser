import View from '@Hi/View';

export default class HIFullScreenView extends View<HTMLDivElement> {
    constructor(...children: View<HTMLElement>[]) {
        super('div', ...children);
        this.width('100vw').height('100vh');
    }
}
