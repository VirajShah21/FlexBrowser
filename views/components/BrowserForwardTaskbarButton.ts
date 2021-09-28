import IonIcon from '@Hi/Components/IonIcon';
import FlexBrowserWindow from '@UI/FlexBrowserWindow';
import TaskbarButton from './TaskbarButton';

export default class BrowserForwardTaskbarButton extends TaskbarButton {
    constructor() {
        super(new IonIcon('chevron-forward-circle-outline'));
        this.whenClicked(ev =>
            (ev.view.root() as FlexBrowserWindow).nextPage(),
        );
    }
}
