import { HColor } from '@Hi/Colors';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import TextField from '@Hi/Components/TextField';
import FlexBrowserWindow from 'src/FlexBrowserWindow';

export default class URLBar extends TextField {
    constructor() {
        super('flex://home');

        this.stretchWidth()
            .textCenter()
            .id('url')
            .whenChanged(ev => {
                const browserWindow = ev.view.root(
                    view => (view as FlexBrowserWindow).isBrowserWindow
                ) as FlexBrowserWindow;
                const icon = browserWindow.getViewById(
                    'url-refresh-button'
                ) as IonIcon;

                (icon.body as HTMLInputElement).name = 'arrow-forward-outline'; // ! Workaround to use .name
            })
            .noOutline()
            .whenFocused(ev =>
                ev.view.background(HColor('background')).textStart()
            )
            .whenUnfocused(ev => ev.view.background('none').textCenter())
            .whenKeyPressed(ev => {
                if (ev.key == 'Enter') {
                    const browserWindow = ev.view.root(
                        view => (view as FlexBrowserWindow).isBrowserWindow
                    ) as FlexBrowserWindow;
                    const searchbar = this.getViewById('url') as InputField;
                    browserWindow.goTo(searchbar.model.value);
                }
            });
    }
}
