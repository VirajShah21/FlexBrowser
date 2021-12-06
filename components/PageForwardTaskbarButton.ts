import IonIcon from '@Hi/Components/IonIcon';
import BrowserPreferences from '@Models/BrowserPreferences';
import FlexBrowserWindow from '@UI/FlexBrowserWindow';
import TaskbarButton from './TaskbarButton';

export default class PageForwardTaskbarButton extends TaskbarButton {
    constructor() {
        super();
        this.whenClicked(ev =>
            (ev.view.root() as FlexBrowserWindow).nextPage(),
        );
    }

    // eslint-disable-next-line class-methods-use-this
    public resolveIcon(): IonIcon {
        const theme = BrowserPreferences.IconTheme.backForward;
        switch (theme) {
            case 'arrow':
                return new IonIcon('arrow-forward');
            case 'arrow-circle-filled':
                return new IonIcon('arrow-forward-circle');
            case 'arrow-circle-outline':
                return new IonIcon('arrow-forward-circle-outline');
            case 'caret':
                return new IonIcon('caret-forward');
            case 'caret-circle-filled':
                return new IonIcon('caret-forward-circle');
            case 'caret-circle-outline':
                return new IonIcon('caret-forward-circle-outline');
            case 'chevron':
                return new IonIcon('chevron-forward');
            case 'chevron-circle-filled':
                return new IonIcon('chevron-forward-circle');
            case 'chevron-circle-outline':
                return new IonIcon('chevron-forward-circle-outline');
            case 'return':
                return new IonIcon('return-up-forward');
            default:
                return new IonIcon('chevron-forward');
        }
    }
}
