import View from '@Hi/View';

export default class Group extends View {
    constructor(element: string, ...children: View[]) {
        super(element, ...children);
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';
        this.body.style.textAlign = 'center';
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
