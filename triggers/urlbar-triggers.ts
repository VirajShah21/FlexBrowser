import URLBar from '@Components/URLBar';
import { HColor } from '@Hi/Colors';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import { defineTransition } from '@Hi/Transitions/Transition';
import HumanEvent, { HumanKeyPressEvent } from '@Hi/Types/HumanEvent';
import FlexBrowserWindow from '@UI/FlexBrowserWindow';

const whenFocusedTransition = defineTransition({
    from: {
        background: 'none',
        width: '100%',
    },
    '25%': {
        width: '25%',
    },
    to: {
        background: HColor('background'),
        width: '100%',
    },
    iterations: 1,
    duration: 0.5,
    after: 'forwards',
});

const whenUnfocusedTransition = defineTransition({
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

export function changeReloadButtonToGoButton(ev: HumanEvent): void {
    const browserWindow = ev.view.root(
        view => (view as FlexBrowserWindow).isBrowserWindow,
    ) as FlexBrowserWindow;
    const icon = browserWindow.findViewById('url-refresh-button') as IonIcon;

    (icon.body as HTMLInputElement).name = 'arrow-forward-outline'; // ! Workaround to use .name
}

export function urlbarFocusedState(ev: HumanEvent): void {
    const urlBar = ev.view as URLBar;
    urlBar.transition(whenFocusedTransition);
    urlBar.background(HColor('background')).textStart();
    urlBar.value = urlBar.urlInfo.url;
}

export function urlbarUnfocusedState(ev: HumanEvent): void {
    const urlBar = ev.view as URLBar;
    urlBar.transition(whenUnfocusedTransition);
    urlBar.background('none').textCenter();
    urlBar.value = '';
    urlBar.placeholder = urlBar.urlInfo.title;
}

export function urlbarKeyPressed(ev: HumanKeyPressEvent): void {
    if (ev.key === 'Enter') {
        const browserWindow = ev.view.root(
            view => (view as FlexBrowserWindow).isBrowserWindow,
        ) as FlexBrowserWindow;
        browserWindow.goTo((ev.view as InputField).value);
    }
}
