import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import ImageView from '@Hi/Components/ImageView';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import TextField from '@Hi/Components/TextField';
import { defineTransition } from '@Hi/Transitions/Transition';
import HumanEvent, { HumanKeyPressEvent } from '@Hi/Types/HumanEvent';
import ValidURL from '@Models/ValidURL';
import FlexBrowserWindow from '@UI/FlexBrowserWindow';
import Favicon from './Favicon';
import RefreshTaskbarButton from './TaskbarButtons/RefreshTaskbarButton';

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

export function urlbarFocusedState(ev: HumanEvent<TextField>): void {
    const urlField = ev.view;
    const urlBar = urlField.parent as URLBar;
    const reloadBtn = urlBar.findViewById('url-refresh-button') as IonIcon;
    const titlebarTransitionViews = ev.view
        .root()
        .getViewsByClass('titlebar-transition');

    urlBar.transition(whenFocusedTransition).then(() => {
        urlBar.glow(HColor('gray').alpha(0.8), 20);
        titlebarTransitionViews.forEach(view =>
            view.transition(FlexBrowserWindow.TRANS_UNHOVER),
        );
    });
    urlField.textStart().value = urlBar.urlInfo.url;
    (reloadBtn.body as HTMLInputElement).name = 'arrow-forward-outline';
}

export function urlbarUnfocusedState(ev: HumanEvent<TextField>): void {
    const urlField = ev.view;
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

/**
 * The component for the URL entry bar.
 * This includes the favicon, the URL, and a reload button. Additionally, it
 * doubles as a title bar by displaying the title of the current page when the
 * bar is unfocused. When the URLBar refocuses, it will display the URL.
 *
 * @export
 * @class URLBar
 * @extends {HStack}
 */
export default class URLBar extends HStack {
    public readonly buildin = defineTransition({
        from: { opacity: 0 },
        to: { opacity: 1 },
        iterations: 1,
        duration: 1,
        delay: 1,
        after: 'forwards',
    });

    public urlInfo: URLMeta = {
        url: 'flex://home',
        title: 'Flex Homepage',
    };

    /**
     * Creates an instance of URLBar.
     *
     * @memberOf URLBar
     */
    constructor() {
        super(
            new ImageView('../assets/icon.png')
                .id('favicon')
                .width(15)
                .height(15),
            new TextField('flex://home')
                .width('100%')
                .background('none')
                .textCenter()
                .noOutline()
                .border({ size: 0 })
                .whenFocused(urlbarFocusedState)
                .whenUnfocused(urlbarUnfocusedState)
                .whenKeyPressed(urlbarKeyPressed)
                .selectWhenFocused()
                .id('url'),
            new RefreshTaskbarButton(),
        );

        this.width('100%')
            .background('none')
            .foreground(HColor('gray'))
            .border({
                size: 1,
                style: 'solid',
                color: HColor('gray3').alpha(0.5),
            })
            .rounded()
            .opacity(0)
            .padding({ left: 5, right: 5 });
    }

    /**
     * Updates the information of the URLBar.
     *
     *
     * @memberOf URLBar
     */
    public updateURLInfo(): void {
        this.urlInfo = flexarch.urlInfo();
        (this.findViewById('url') as TextField).placeholder =
            this.urlInfo.title;
    }

    /**
     * Retrieves the favicon for the current webpage.
     * This is displayed to  the left of the URL.
     *
     *
     * @memberOf URLBar
     */
    public updateFavicon(): void {
        const favicon = this.findViewById('favicon') as ImageView;
        favicon.source = Favicon.getFaviconURL(
            new ValidURL(this.urlInfo.url),
            'ico',
        );
        const untriedExtensions = ['png', 'svg', 'jpg'];
        favicon.whenError(() => {
            if (untriedExtensions.length > 0) {
                favicon.source = Favicon.getFaviconURL(
                    new ValidURL(this.urlInfo.url),
                    untriedExtensions.splice(0, 1)[0],
                );
            }
        });
    }

    /**
     * Handles the buildin and buildout.
     *
     *
     * @memberOf URLBar
     */
    public override handle(data: string): void {
        if (data === 'hi:buildin') {
            this.transition(this.buildin).then(() => {
                this.opacity(1);
                this.removeTransition();
            });
        } else if (data === 'browser-navigated') {
            this.updateURLInfo();
            this.updateFavicon();
        }
    }
}
