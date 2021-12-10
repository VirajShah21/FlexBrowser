import View from '@Hi/View';
import SelectMenuOption from './SelectMenuOption';

export default class SelectMenu extends View {
    constructor(...options: SelectMenuOption[]) {
        super('select', ...options);
    }
}
