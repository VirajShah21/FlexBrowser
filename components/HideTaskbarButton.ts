import IonIcon from '@Hi/Components/IonIcon';
import toggleTaskbarVisibility from '@Triggers/TaskbarTriggers';
import TaskbarButton from './TaskbarButton';

export default class HideTaskbarButton extends TaskbarButton {
    public isShown = true;

    constructor() {
        super(new IonIcon('chevron-up').id('taskbar-toggle-icon'));
        this.padding(0).font('sm').whenClicked(toggleTaskbarVisibility);
    }
}
