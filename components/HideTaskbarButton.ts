import IonIcon from '@Hi/Components/IonIcon';
import toggleTaskbarVisibility from '@Triggers/TaskbarTriggers';
import TaskbarButton from './TaskbarButton';

export default class HideTaskbarButton extends TaskbarButton {
    public isShown = true;

    constructor() {
        super();
        this.padding(0).font('sm').whenClicked(toggleTaskbarVisibility);
    }

    // eslint-disable-next-line class-methods-use-this
    public resolveIcon(): IonIcon {
        return new IonIcon('chevron-up').id('taskbar-toggle-icon');
    }
}
