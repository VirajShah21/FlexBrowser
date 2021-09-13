import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';

export default class NewWindowTaskbarButton extends ClickButton {
    constructor() {
        super(new IonIcon('add-circle-outline'));
        this.whenClicked(() => flexarch.newWindow());
    }
}
