import HideTaskbarButton from '@Components/HideTaskbarButton';
import IonIcon from '@Hi/Components/IonIcon';
import TextView from '@Hi/Components/TextView';
import HumanEvent from '@Hi/Types/HumanEvent';
import { ViewController } from '@Hi/ViewController';

export default function toggleTaskbarVisibility(
    ev: HumanEvent<HideTaskbarButton>,
): void {
    const { view } = ev;
    view.isShown = !view.isShown;

    if (view.isShown) {
        flexarch.showTaskbar();
        (view.body as HTMLInputElement).name = 'chevron-down';
        (view.root().findViewById('titlebar-title') as TextView).text = '';
        ViewController.getController('AppController')
            ?.findViewById('url-bar')
            ?.opacity(1);
        (
            ViewController.getController('AppController')?.findViewById(
                'taskbar-toggle-icon',
            ) as IonIcon
        ).name = 'chevron-up';
    } else {
        flexarch.hideTaskbar();
        (view.body as HTMLInputElement).name = 'chevron-up';
        (view.root().findViewById('titlebar-title') as TextView).text =
            flexarch.urlInfo().title;
        ViewController.getController('AppController')
            ?.findViewById('url-bar')
            ?.opacity(0);
        (
            ViewController.getController('AppController')?.findViewById(
                'taskbar-toggle-icon',
            ) as IonIcon
        ).name = 'chevron-down';
    }
}
