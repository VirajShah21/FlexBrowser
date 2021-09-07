import View from '../View';

export class Container extends View {
    constructor(...children: View[]) {
        super('div', ...children);
    }
}
