import LaunchHubTaskbarButton from '@Components/LaunchHubTaskbarButton';
import NewWindowTaskbarButton from '@Components/NewWindowTaskbarButton';
import PageNavigationTaskbarButtons from '@Components/PageNavigationTaskbarButtons';
import URLBar from '@Components/URLBar';
import { HColor } from '@Hi/Colors';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { defineTransition } from '@Hi/Transitions/Transition';
import View from '@Hi/View';
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
                new TextView('Flex Browser')
                    .width('100%')
                    .fixed()
                    .font('sm')
                    .foreground(HColor('gray'))
                    .setTop(0)
                    .padding({ top: 3, bottom: 3 }),
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
                    .blur()
                    .width('100%')
                    .padding()
                    .padding({ top: 20, bottom: 20 })
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

                new Spacer(), // Pushes navbar to top and makes space for Electron.BrowserView
            )
                .stretch()
                .background(HColor('background').alpha(0.5)),
        );

        const titlebar = this.findViewById('titlebar') as View;
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

        const icon = this.findViewById('url-refresh-button') as IonIcon;
        const urlfield = this.findViewById('url') as TextField;
        const urlbar = this.findViewById('url-bar') as URLBar;

        flexarch.changeUrl(newUrl);
        (icon.body as HTMLInputElement).name = 'reload'; // ! Workaround to use .name

        if (addToHistory) {
            this.history.push(newUrl);
            this.historyPointer = this.history.length - 1;
        }

        urlfield.value = newUrl;
        urlbar.updateURLInfo();

        return this.history.map(e => e);
    }

    /**
     * Navigates to the previous page
     *
     * @memberOf FlexBrowserWindow
     */
    public previousPage(): void {
        this.historyPointer -= 1;
        if (
            this.historyPointer >= 0 &&
            this.historyPointer < this.history.length
        ) {
            this.goTo(
                this.history[this.historyPointer] || 'flex://error',
                false,
            );
        } else this.historyPointer += 1;
    }

    /**
     * Navigates to the next page
     *
     * @memberOf FlexBrowserWindow
     */
    public nextPage(): void {
        this.historyPointer += 1;
        if (
            this.historyPointer >= 0 &&
            this.historyPointer < this.history.length
        ) {
            this.goTo(this.history[this.historyPointer] || 'flex://error');
        } else this.historyPointer -= 1;
    }
}
