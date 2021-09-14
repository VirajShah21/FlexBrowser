import IonIcon from '@Hi/Components/IonIcon';
import TaskbarButton from 'out/flex-browser-darwin-x64/flex-browser.app/Contents/Resources/app/src/components/TaskbarButton';
import FlexBrowserWindow from 'src/FlexBrowserWindow';

export default class BrowserBackTaskbarButton extends TaskbarButton {
    constructor() {
        super(new IonIcon('chevron-back-circle-outline'));
        this.whenClicked(ev =>
            (ev.view.root() as FlexBrowserWindow).previousPage()
        );
    }
}
