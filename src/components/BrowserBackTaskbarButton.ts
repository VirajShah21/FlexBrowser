import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import FlexBrowserWindow from 'src/FlexBrowserWindow';

export default class BrowserBackTaskbarButton extends ClickButton {
    constructor() {
        super(new IonIcon('chevron-back-circle-outline'));
        this.whenClicked(ev =>
            (ev.view.root() as FlexBrowserWindow).previousPage()
        );
    }
}
