import IonIcon from '@Hi/Components/IonIcon';
import TextView from '@Hi/Components/TextView';
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

                if (view.isShown) {
                    flexarch.showTaskbar();
                    (view.body as HTMLInputElement).name = 'chevron-down';
                    (
                        view.root().findViewById('titlebar-title') as TextView
                    ).text = '';
                } else {
                    flexarch.hideTaskbar();
                    (view.body as HTMLInputElement).name = 'chevron-up';
                    (
                        view.root().findViewById('titlebar-title') as TextView
                    ).text = flexarch.urlInfo().title;
                }
            });
    }
}
