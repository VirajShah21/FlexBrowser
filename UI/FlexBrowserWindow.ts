import Sashe from '@Components/Sashe';
import LaunchHubTaskbarButton from '@Components/TaskbarButtons/LaunchHubTaskbarButton';
import NewWindowTaskbarButton from '@Components/TaskbarButtons/NewWindowTaskbarButton';
import PageNavigationTaskbarButtons from '@Components/TaskbarButtons/PageNavigationTaskbarButtons';
import URLBar from '@Components/URLBar';
import { HColor } from '@Hi/Colors';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { defineTransition } from '@Hi/Transitions/Transition';
import ValidURL from '@Models/ValidURL';

/**
 * The window browser frame for Flex Browser
 *
 * @export
 * @class FlexBrowserWindow
 * @extends {HIFullScreenView}
 */
export default class FlexBrowserWindow extends HIFullScreenView {
    private static readonly PROTOCOLS = ['http', 'https'];

    public static readonly TRANS_HOVER = defineTransition({
        from: {
            opacity: 0.1,
        },
        to: {
            opacity: 1,
        },
        iterations: 1,
        duration: 1,
        after: 'forwards',
    });

    public static readonly TRANS_UNHOVER = defineTransition({
        from: {
            opacity: 1,
        },
        to: {
            opacity: 0.1,
        },
        iterations: 1,
        duration: 1,
        after: 'forwards',
    });

    public readonly isBrowserWindow = true;

    private history: string[] = [];

    private historyPointer = 0;

    /**
     * Creates an instance of FlexBrowserWindow.
     *
     * @memberOf FlexBrowserWindow
     */
    constructor() {
        super(
            new VStack(
                new HStack(
                    new HStack(new PageNavigationTaskbarButtons(), new Spacer())
                        .width('25%')
                        .padding({ left: 10, right: 10 })
                        .addClass('titlebar-transition'),

                    new HStack(new URLBar().id('url-bar')).width({
                        min: 200,
                        default: '50%',
                        max: 600,
                    }),

                    new HStack(
                        new Spacer(),
                        new LaunchHubTaskbarButton(),
                        new NewWindowTaskbarButton(),
                    )
                        .width('25%')
                        .padding({ left: 10, right: 10 })
                        .addClass('titlebar-transition'),
                )
                    .width('100%')
                    .padding()
                    .padding(10)
                    .whenMouseOver(ev => {
                        ev.view
                            .getViewsByClass('titlebar-transition')
                            .forEach(view =>
                                view.transition(FlexBrowserWindow.TRANS_HOVER),
                            );
                    })
                    .whenMouseOut(ev => {
                        ev.view
                            .getViewsByClass('titlebar-transition')
                            .forEach(view =>
                                view.transition(
                                    FlexBrowserWindow.TRANS_UNHOVER,
                                ),
                            );
                    })
                    .id('titlebar'),

                new Spacer(),

                new Sashe().fixed().setBottom(0),
            )
                .stretch()
                .background(HColor('background').alpha(0.75)),
        );

        const titlebar = this.findViewById<HStack>('titlebar')!;
        titlebar.body.style.setProperty('-webkit-app-region', 'drag');
    }

    /**
     * Navigates the page to a specified URL.
     *
     * @param {string} url The URL to navigate to.
     * @param {boolean} [addToHistory=true] Whether the URL should be added to the local history.
     * @returns {string[]} A **copy** of the current window's session history
     *
     * @memberOf FlexBrowserWindow
     */
    public goTo(url: string, addToHistory = true): string[] {
        const newUrl = new ValidURL(url).toString();

        const icon = this.findViewById<IonIcon>('url-refresh-button')!;
        const urlfield = this.findViewById<TextField>('url')!;
        const urlbar = this.findViewById<URLBar>('url-bar')!;

        const { history } = this;

        flexarch.changeUrl(newUrl);
        icon.name = 'reload';

        if (addToHistory) {
            history.push(newUrl);
            this.historyPointer = this.history.length - 1;
        }

        urlfield.value = newUrl;
        urlbar.updateURLInfo();

        return history.map(e => e);
    }

    /**
     * Navigates to the previous page
     *
     * @memberOf FlexBrowserWindow
     */
    public previousPage(): void {
        let hp = this.historyPointer;
        const { history } = this;

        hp -= 1;

        if (hp >= 0 && hp < history.length) {
            this.goTo(history[hp] || 'flex://error', false);
        } else hp += 1;

        this.historyPointer = hp;
    }

    /**
     * Navigates to the next page
     *
     * @memberOf FlexBrowserWindow
     */
    public nextPage(): void {
        let hp = this.historyPointer;
        const { history } = this;

        hp += 1;
        if (hp >= 0 && hp < history.length) {
            this.goTo(history[hp] || 'flex://error');
        } else hp -= 1;

        this.historyPointer = hp;
    }

    public override handle(data: string, ...args: unknown[]): void {
        const errorView = this.findViewById('error')!;

        if (data === 'page-load-err') {
            errorView
                .opacity(1)
                .removeAllChildren()
                .addChildren(
                    new TextView(`Error: ${args[0]}`)
                        .weight(FontWeight.UltraHeavy)
                        .font('xxl')
                        .margin({ bottom: 25 }),
                    new TextView(
                        `An error occured when navigating to ${args[1]} – ${args[0]}`,
                    )
                        .background(HColor('background').alpha(0.9))
                        .foreground(HColor('foreground'))
                        .font('lg')
                        .weight(FontWeight.Light)
                        .padding(20)
                        .rounded(),
                );
        } else if (data === 'page-load-good') {
            errorView.opacity(0);
        }
    }
}
