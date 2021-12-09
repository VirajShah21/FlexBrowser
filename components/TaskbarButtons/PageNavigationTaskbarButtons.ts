import HStack from '@Hi/Components/HStack';
import PageBackTaskbarButton from './PageBackTaskbarButton';
import PageForwardTaskbarButton from './PageForwardTaskbarButton';

/**
 * The horizontal stack which holds both the forward and back taskbar buttons.
 *
 * @export
 * @class PageNavigationTaskbarButtons
 * @extends {HStack}
 */
export default class PageNavigationTaskbarButtons extends HStack {
    /**
     * Creates an instance of PageNavigationTaskbarButtons.
     *
     * @memberOf PageNavigationTaskbarButtons
     */
    constructor() {
        super(
            // Back button
            new PageBackTaskbarButton().padding({ left: 3, right: 3 }),

            // Forward button
            new PageForwardTaskbarButton(),
        );
    }
}
