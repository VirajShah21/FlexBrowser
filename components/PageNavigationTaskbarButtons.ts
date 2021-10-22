import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import FlexBrowserWindow from '@UI/FlexBrowserWindow';
import TaskbarButton from './TaskbarButton';

class NavButton extends TaskbarButton {
    constructor(direction: 'forward' | 'back') {
        super(new IonIcon(`chevron-${direction}-outline`));
    }
}
export default class PageNavigationTaskbarButtons extends HStack {
    constructor() {
        super(
            // Back button
            new NavButton('back').whenClicked(ev =>
                (ev.view.root() as FlexBrowserWindow).previousPage(),
            ),

            // Forward button
            new NavButton('forward').whenClicked(ev =>
                (ev.view.root() as FlexBrowserWindow).nextPage(),
            ),
        );
    }
}
