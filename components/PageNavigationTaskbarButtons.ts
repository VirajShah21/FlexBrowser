import HStack from '@Hi/Components/HStack';
import PageBackTaskbarButton from './PageBackTaskbarButton';
import PageForwardTaskbarButton from './PageForwardTaskbarButton';

export default class PageNavigationTaskbarButtons extends HStack {
    constructor() {
        super(
            // Back button
            new PageBackTaskbarButton().padding({ left: 3, right: 3 }),

            // Forward button
            new PageForwardTaskbarButton(),
        );
    }
}
