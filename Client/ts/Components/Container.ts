import View from '../View';

export default class Container extends View<HTMLDivElement> {
    constructor(...children: View<HTMLElement>[]) {
        super('div', ...children);
    }
}
