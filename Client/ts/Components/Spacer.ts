import View from '@Hi/View';

export default class Spacer extends View {
    constructor() {
        super('div');
        this.body.innerHTML = '&nbsp;';
        this.body.style.flexGrow = '1';
        this.body.style.width = 'auto';
        this.body.style.height = 'auto';
        this.body.style.fontSize = '1px';
    }
}
