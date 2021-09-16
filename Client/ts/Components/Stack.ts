import View from '@Hi/View';
import Group from './Group';

export default abstract class Stack extends Group {
    constructor(...children: View[]) {
        super(...children);
        this.body.style.display = 'flex';
        this.body.style.boxSizing = 'border-box';
    }

    alignEnd(): this {
        this.body.style.alignItems = 'flex-end';
        this.body.style.justifyContent = 'flex-end';
        return this;
    }

    alignMiddle(): this {
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';
        return this;
    }

    alignStart(): this {
        this.body.style.alignItems = 'flex-start';
        this.body.style.justifyContent = 'flex-start';
        return this;
    }
}
