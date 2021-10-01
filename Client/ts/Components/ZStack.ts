import View from '@Hi/View';
import Stack from './Stack';

export default class ZStack extends Stack {
    /**
     * Creates an instance of ZStack.
     * @param {View[]} children The children of this ZStack.
     *
     * @memberOf ZStack
     */
    constructor(...children: View[]) {
        super(...children);
        this.body.style.display = 'grid';
        this.body.style.textAlign = 'center';
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';

        this.children.forEach(child => {
            // eslint-disable-next-line no-param-reassign
            child.body.style.gridArea = '1/1/1/1';
        });
    }
}
