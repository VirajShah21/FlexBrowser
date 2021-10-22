import IonIcon from '@Hi/Components/IonIcon';
import TaskbarButton from './TaskbarButton';

export default class HideTaskbarButton extends TaskbarButton {
    private isShown = true;

    constructor() {
        super(new IonIcon('chevron-down'));
        this.padding(0)
            .font('sm')
            .whenClicked(flexarch.hideTaskbar)
            .whenClicked(ev => {
                const view = ev.view as HideTaskbarButton;
                view.isShown = !view.isShown;
                (view.body as HTMLInputElement).name = view.isShown
                    ? 'chevron-down'
                    : 'chevron-up';
                if (view.isShown) flexarch.showTaskbar();
                else flexarch.hideTaskbar();
            });
    }
}
