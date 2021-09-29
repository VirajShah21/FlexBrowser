import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import FlexBrowserWindow from '@UI/FlexBrowserWindow';

export default class PageNavigationTaskbarButtons extends HStack {
    constructor() {
        super(
            // Back button
            new ClickButton(
                new IonIcon('chevron-back-circle-outline'),
            ).whenClicked(ev =>
                (ev.view.root() as FlexBrowserWindow).previousPage(),
            ),

            // Forward button
            new ClickButton(
                new IonIcon('chevron-forward-circle-outline'),
            ).whenClicked(ev =>
                (ev.view.root() as FlexBrowserWindow).nextPage(),
            ),
        );
    }
}
