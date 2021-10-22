import IonIcon from '@Hi/Components/IonIcon';
import TaskbarButton from './TaskbarButton';

export default class ExpandTaskbarButton extends TaskbarButton {
    constructor() {
        super(new IonIcon('expand'));
        this.whenClicked(() => flexarch.focusHub());
    }
}
