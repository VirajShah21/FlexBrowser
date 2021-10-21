import IonIcon from '@Hi/Components/IonIcon';
import TaskbarButton from './TaskbarButton';

export default class LaunchHubTaskbarButton extends TaskbarButton {
    constructor() {
        super(new IonIcon('rocket-outline'));
        this.whenClicked(() => flexarch.focusHub());
    }
}
