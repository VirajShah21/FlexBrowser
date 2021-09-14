import IonIcon from '@Hi/Components/IonIcon';
import TaskbarButton from './TaskbarButton';

export default class NewWindowTaskbarButton extends TaskbarButton {
    constructor() {
        super(new IonIcon('add-circle-outline'));
        this.whenClicked(() => flexarch.newWindow());
    }
}
