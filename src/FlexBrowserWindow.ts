import { HColor } from '@Hi/Colors';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import VStack from '@Hi/Components/VStack';
import View from '@Hi/View';
import BrowserBackTaskbarButton from './components/BrowserBackTaskbarButton';
import BrowserForwardTaskbarButton from './components/BrowserForwardTaskbarButton';
import NewWindowTaskbarButton from './components/NewWindowTaskbarButton';
import RefreshTaskbarButton from './components/RefreshTaskbarButton';
import URLBar from './components/URLBar';

/**
 * The window browser frame for Flex Browser
 *
 * @export
 * @class FlexBrowserWindow
 * @extends {HIFullScreenView}
 */
export default class FlexBrowserWindow extends HIFullScreenView {
    private static readonly PROTOCOLS = ['http', 'https'];

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
                    new HStack(
                        new BrowserBackTaskbarButton(),
                        new BrowserForwardTaskbarButton(),
                        new Spacer(),
                    )
                        .width('25%')
                        .padding({ left: 10, right: 10 }),

                    new HStack(new URLBar()).width({
                        min: 200,
                        default: '50%',
                        max: 600,
                    }),

                    new HStack(
                        new RefreshTaskbarButton(),
                        new Spacer(),

                        new NewWindowTaskbarButton(),
                    )
                        .width('25%')
                        .padding({ left: 10, right: 10 }),
                )
                    .blur()
                    .width('100%')
                    .padding()
                    .padding({ top: 20, bottom: 20 })
                    .id('titlebar'),

                new Spacer(), // Pushes navbar to top and makes space for Electron.BrowserView
            )
                .stretch()
                .background(HColor('background').alpha(0.5)),
        );

        const titlebar = this.getViewById('titlebar') as View;
        titlebar.body.style.setProperty('-webkit-app-region', 'drag');
    }

    /**
     * Converts a given URL into a standardized URL format.
     *
     * @static
     * @param {string} newUrl The URL to standardize.
     * @returns {string} The standardized URL.
     *
     * @memberOf FlexBrowserWindow
     */
    public static goodUrl(url: string): string {
        let newUrl = url.trim();
        let goodProtocol = false;
        if (newUrl.includes('://')) {
            const givenProtocol = newUrl.substring(0, newUrl.indexOf('://'));
            if (FlexBrowserWindow.PROTOCOLS.indexOf(givenProtocol) >= 0) {
                goodProtocol = true;
            }
        }
        if (!goodProtocol) newUrl = `https://${newUrl}`;
        return newUrl;
    }

    /**
     * Navigates the page to a specified URL.
     *
     * @param {string} url The URL to navigate to.
     * @param {boolean} [addToHistory=true] Whether the URL should be added to the local history.
     *
     * @memberOf FlexBrowserWindow
     */
    public goTo(url: string, addToHistory = true): void {
        const newUrl = FlexBrowserWindow.goodUrl(url);

        const icon = this.getViewById('url-refresh-button') as IonIcon;
        const urlbar = this.getViewById('url') as InputField;

        flexarch.changeUrl(newUrl);
        (icon.body as HTMLInputElement).name = 'refresh-circle-outline'; // ! Workaround to use .name

        if (addToHistory) {
            this.history.push(newUrl);
            this.historyPointer = this.history.length - 1;
        }

        urlbar.model.value = newUrl;
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
