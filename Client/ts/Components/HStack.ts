import View from '@Hi/View';
import Stack from './Stack';

export default class HStack extends Stack {
    constructor(...children: View<HTMLElement>[]) {
        super(...children);
        this.body.style.flexDirection = 'row';
    }
}
