import View from '@Hi/View';

export default class ScrollView extends View<HTMLDivElement> {
    constructor(...children: View<HTMLElement>[]) {
        super('div', ...children);
        this.body.style.overflowY = 'scroll';
        this.body.style.boxSizing = 'border-box';
    }
}
