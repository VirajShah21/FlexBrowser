import { HColor } from '@Hi/Colors';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import TextField from '@Hi/Components/TextField';
import { defineTransition } from '@Hi/Transitions/Transition';
import FlexBrowserWindow from 'src/FlexBrowserWindow';

const whenFocusedTransition = defineTransition({
    from: {
        background: HColor('background'),
        width: '100%',
    },
    '25%': {
        width: '25%',
    },
    to: {
        background: 'none',
        width: '100%',
    },
    iterations: 1,
    duration: 0.5,
    after: 'forwards',
});

const whenUnfocusedTransition = defineTransition({
    to: {
        background: HColor('background'),
    },
    iterations: 1,
    duration: 0.5,
    after: 'forwards',
});

export default class URLBar extends TextField {
    constructor() {
        super('flex://home');

        this.width('100%')
            .textCenter()
            .background('none')
            .foreground(HColor('gray'))
            .id('url')
            .whenChanged(ev => {
                const browserWindow = ev.view.root(
                    view => (view as FlexBrowserWindow).isBrowserWindow,
                ) as FlexBrowserWindow;
                const icon = browserWindow.getViewById(
                    'url-refresh-button',
                ) as IonIcon;

                (icon.body as HTMLInputElement).name = 'arrow-forward-outline'; // ! Workaround to use .name
            })
            .noOutline()
            .whenFocused(ev => {
                ev.view.transition(whenFocusedTransition);
                (
                    ev.view.background(HColor('background')) as TextField
                ).textStart();
            })
            .whenUnfocused(ev => {
                ev.view.transition(whenUnfocusedTransition);
                (ev.view.background('none') as TextField).textCenter();
            })
            .whenKeyPressed(ev => {
                if (ev.key === 'Enter') {
                    const browserWindow = ev.view.root(
                        view => (view as FlexBrowserWindow).isBrowserWindow,
                    ) as FlexBrowserWindow;
                    browserWindow.goTo((ev.view as InputField).model.value);
                }
            });
    }
}
