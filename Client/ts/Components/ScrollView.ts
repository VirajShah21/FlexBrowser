import View from '@Hi/View';

export class ScrollView extends View {
    constructor(...children: View[]) {
        super('div', ...children);
        this.body.style.overflowY = 'scroll';
        this.body.style.boxSizing = 'border-box';
    }
}
