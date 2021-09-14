import IonIcon from '@Hi/Components/IonIcon';
import FlexBrowserWindow from 'src/FlexBrowserWindow';
import TaskbarButton from './TaskbarButton';

export default class BrowserBackTaskbarButton extends TaskbarButton {
    constructor() {
        super(new IonIcon('chevron-back-circle-outline'));
        this.whenClicked(ev =>
            (ev.view.root() as FlexBrowserWindow).previousPage()
        );
    }
}
