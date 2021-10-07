import View from '../View';

export default class Container extends View {
    constructor(...children: View[]) {
        super('div', ...children);
    }
}
