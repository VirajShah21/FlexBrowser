import URLBar from '@Components/URLBar';
import { HColor } from '@Hi/Colors';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import TextField from '@Hi/Components/TextField';
import RGBAModel from '@Hi/RGBAModel';
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
    const urlField = ev.view as TextField;
    const urlBar = urlField.parent as URLBar;
    const reloadBtn = urlBar.findViewById('url-refresh-button') as IonIcon;
    const titlebarTransitionViews = ev.view
        .root()
        .getViewsByClass('titlebar-transition');

    urlBar.transition(whenFocusedTransition).then(() => {
        urlBar.glow(RGBAModel.BLACK.alpha(0.25), 10);
        titlebarTransitionViews.forEach(view =>
            view.transition(FlexBrowserWindow.TRANS_UNHOVER),
        );
    });
    urlField.textStart().value = urlBar.urlInfo.url;
    (reloadBtn.body as HTMLInputElement).name = 'arrow-forward-outline';
}

export function urlbarUnfocusedState(ev: HumanEvent): void {
    const urlField = ev.view as TextField;
    const urlBar = urlField.parent as URLBar;
    const reloadBtn = urlBar.findViewById('url-refresh-button') as IonIcon;

    urlBar.body.style.boxShadow = 'none';
    urlBar.transition(whenUnfocusedTransition).then(() => {
        urlField.placeholder = urlBar.urlInfo.title; // This can be delayed
    });
    urlField.textCenter();
    urlField.value = '';
    (reloadBtn.body as HTMLInputElement).name = 'reload';
}

export function urlbarKeyPressed(ev: HumanKeyPressEvent): void {
    if (ev.key === 'Enter') {
        const browserWindow = ev.view.root(
            view => (view as FlexBrowserWindow).isBrowserWindow,
        ) as FlexBrowserWindow;
        browserWindow.goTo((ev.view as InputField).value);
    }
}
