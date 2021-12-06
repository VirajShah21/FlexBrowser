import IonIcon from '@Hi/Components/IonIcon';
import toggleTaskbarVisibility from '@Triggers/TaskbarTriggers';
import TaskbarButton from './TaskbarButton';

/**
 * The button which hides and unhides the taskbar bulk.
 *
 * @export
 * @class HideTaskbarButton
 * @extends {TaskbarButton}
 */
export default class HideTaskbarButton extends TaskbarButton {
    public isShown = true;

    /**
     * Creates an instance of HideTaskbarButton.
     *
     * @memberOf HideTaskbarButton
     */
    constructor() {
        super();
        this.padding(0).font('sm').whenClicked(toggleTaskbarVisibility);
    }

    /**
     * @returns {IonIcon} Renders the 'chevron-up' icon by default.
     *
     * @memberOf HideTaskbarButton
     */
    // eslint-disable-next-line class-methods-use-this
    public resolveIcon(): IonIcon {
        return new IonIcon('chevron-up').id('taskbar-toggle-icon');
    }
}
