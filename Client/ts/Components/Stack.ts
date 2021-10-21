import View from '@Hi/View';
import Group from './Group';

export default abstract class Stack extends Group {
    constructor(...children: View[]) {
        super('div', ...children);
        this.body.style.display = 'flex';
        this.body.style.boxSizing = 'border-box';
    }

    public wrap(
        behavior:
            | 'nowrap'
            | 'wrap'
            | 'wrap-reverse'
            | 'inherit'
            | 'initial'
            | 'revert'
            | 'unset' = 'wrap',
    ): this {
        this.body.style.flexWrap = behavior;
        return this;
    }
}
