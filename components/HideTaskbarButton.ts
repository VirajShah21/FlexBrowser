import IonIcon from '@Hi/Components/IonIcon';
import TextView from '@Hi/Components/TextView';
import { ViewController } from '@Hi/ViewController';
import TaskbarButton from './TaskbarButton';

/**
 * The button which hides and unhides the taskbar bulk.
 *
 * @export
 * @class HideTaskbarButton
 * @extends {TaskbarButton}
 */
export default class HideTaskbarButton extends TaskbarButton {
    public isShown = true;

    /**
     * Creates an instance of HideTaskbarButton.
     *
     * @memberOf HideTaskbarButton
     */
    constructor() {
        super();
        this.padding(0)
            .font('sm')
            .whenClicked(ev => {
                const { view } = ev;
                view.isShown = !view.isShown;

                if (view.isShown) {
                    flexarch.showTaskbar();
                    (view.body as HTMLInputElement).name = 'chevron-down';
                    (
                        view.root().findViewById('titlebar-title') as TextView
                    ).text = '';
                    ViewController.getController('AppController')
                        ?.findViewById('url-bar')
                        ?.opacity(1);
                    (
                        ViewController.getController(
                            'AppController',
                        )?.findViewById('taskbar-toggle-icon') as IonIcon
                    ).name = 'chevron-up';
                } else {
                    flexarch.hideTaskbar();
                    (view.body as HTMLInputElement).name = 'chevron-up';
                    (
                        view.root().findViewById('titlebar-title') as TextView
                    ).text = flexarch.urlInfo().title;
                    ViewController.getController('AppController')
                        ?.findViewById('url-bar')
                        ?.opacity(0);
                    (
                        ViewController.getController(
                            'AppController',
                        )?.findViewById('taskbar-toggle-icon') as IonIcon
                    ).name = 'chevron-down';
                }
            });
    }

    /**
     * @returns {IonIcon} Renders the 'chevron-up' icon by default.
     *
     * @memberOf HideTaskbarButton
     */
    // eslint-disable-next-line class-methods-use-this
    public resolveIcon(): IonIcon {
        return new IonIcon('chevron-up').id('taskbar-toggle-icon');
    }
}
