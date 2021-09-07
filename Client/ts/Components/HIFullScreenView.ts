import View from '@Hi/View';

export default class HIFullScreenView extends View {
    constructor(...children: View[]) {
        super('div', ...children);
        this.width('100vw').height('100vh');
    }
}
