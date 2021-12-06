import IonIcon from '@Hi/Components/IonIcon';
import BrowserPreferences from '@Models/BrowserPreferences';
import FlexBrowserWindow from '@UI/FlexBrowserWindow';
import TaskbarButton from './TaskbarButton';

/**
 * The back button on the taskbar.
 *
 * @export
 * @class PageBackTaskbarButton
 * @extends {TaskbarButton}
 */
export default class PageBackTaskbarButton extends TaskbarButton {
    /**
     * Creates an instance of PageBackTaskbarButton.
     *
     * @memberOf PageBackTaskbarButton
     */
    constructor() {
        super();
        this.whenClicked(ev =>
            (ev.view.root() as FlexBrowserWindow).previousPage(),
        );
    }

    // eslint-disable-next-line class-methods-use-this
    public resolveIcon(): IonIcon {
        const theme = BrowserPreferences.IconTheme.backForward;
        switch (theme) {
            case 'arrow':
                return new IonIcon('arrow-back');
            case 'arrow-circle-filled':
                return new IonIcon('arrow-back-circle');
            case 'arrow-circle-outline':
                return new IonIcon('arrow-back-circle-outline');
            case 'caret':
                return new IonIcon('caret-back');
            case 'caret-circle-filled':
                return new IonIcon('caret-back-circle');
            case 'caret-circle-outline':
                return new IonIcon('caret-back-circle-outline');
            case 'chevron':
                return new IonIcon('chevron-back');
            case 'chevron-circle-filled':
                return new IonIcon('chevron-back-circle');
            case 'chevron-circle-outline':
                return new IonIcon('chevron-back-circle-outline');
            case 'return':
                return new IonIcon('return-down-back');
            default:
                return new IonIcon('chevron-back');
        }
    }
}
