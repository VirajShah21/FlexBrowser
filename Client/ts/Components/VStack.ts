import View from '@Hi/View';
import Stack from './Stack';

export default class VStack extends Stack {
    constructor(...children: View[]) {
        super(...children);
        this.body.style.flexDirection = 'column';
    }
}
