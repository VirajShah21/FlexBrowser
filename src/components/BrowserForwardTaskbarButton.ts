import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import FlexBrowserWindow from 'src/FlexBrowserWindow';

export default class BrowserForwardTaskbarButton extends ClickButton {
    constructor() {
        super(new IonIcon('chevron-forward-circle-outline'));
        this.whenClicked(ev =>
            (ev.view.root() as FlexBrowserWindow).nextPage()
        );
    }
}
