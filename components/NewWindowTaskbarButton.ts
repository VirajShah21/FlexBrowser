import IonIcon from '@Hi/Components/IonIcon';
import TaskbarButton from './TaskbarButton';

/**
 * The taskbar button which creates a new window.
 *
 * @export
 * @class NewWindowTaskbarButton
 * @extends {TaskbarButton}
 */
export default class NewWindowTaskbarButton extends TaskbarButton {
    /**
     * Creates an instance of NewWindowTaskbarButton.
     *
     * @memberOf NewWindowTaskbarButton
     */
    constructor() {
        super();
        this.whenClicked(() => flexarch.newWindow());
    }

    // eslint-disable-next-line class-methods-use-this
    public resolveIcon(): IonIcon {
        return new IonIcon('add');
    }
}
