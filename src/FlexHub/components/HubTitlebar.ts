import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import View from '@Hi/View';

/**
 * The titlebar which appears in all hub menus.
 *
 * @export
 * @class HubTitlebar
 * @extends {VStack}
 */
export default class HubTitlebar extends VStack {
    /**
     * Creates an instance of HubTitlebar. A title must be specified.
     * Additionally, children can be added to the View. All children will
     * appear above the title. It is suggested to use an `HStack` along with
     * `.width('100%')` if adding menu items.
     * @param {string} title The title to display in the titlebar.
     * @param {...View[]} children The children to display above the title.
     *
     * @memberOf HubTitlebar
     */
    constructor(title: string, ...children: View[]) {
        super(
            new Spacer(),
            new HStack(...children).width('100%').margin({ top: 20 }),

            new HStack(
                new TextView(title).font('xxl').bold(),
                new Spacer(),
            ).width('100%'),
        );
        this.padding()
            .width('100%')
            .height(100)
            .background(HColor('background').alpha(0.25))
            .foreground(HColor('foreground'));

        this.body.style.setProperty('-webkit-app-region', 'drag');
    }
}
