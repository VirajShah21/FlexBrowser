import IonIcon from '@Hi/Components/IonIcon';
import TaskbarButton from './TaskbarButton';

export default class NewWindowTaskbarButton extends TaskbarButton {
    constructor() {
        super();
        this.whenClicked(() => flexarch.newWindow());
    }

    // eslint-disable-next-line class-methods-use-this
    public resolveIcon(): IonIcon {
        return new IonIcon('add');
    }
}
