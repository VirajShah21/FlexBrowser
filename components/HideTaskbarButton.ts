import IonIcon from '@Hi/Components/IonIcon';
import TaskbarButton from './TaskbarButton';

export default class HideTaskbarButton extends TaskbarButton {
    constructor() {
        super(new IonIcon('chevron-down'));
        this.padding(0)
            .font('sm')
            .whenClicked(flexarch.hideTaskbar)
            .whenClicked(() => console.log('bruh'));
    }
}
