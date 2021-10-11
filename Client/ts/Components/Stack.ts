import View from '@Hi/View';
import Group from './Group';

export default abstract class Stack extends Group {
    constructor(...children: View[]) {
        super('div', ...children);
        this.body.style.display = 'flex';
        this.body.style.boxSizing = 'border-box';
    }
}
