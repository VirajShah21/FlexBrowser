import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import VStack from '@Hi/Components/VStack';
import View from '@Hi/View';
import BrowserHistoryManager from './BrowserHistoryManager';
import BrowserPreferences from './BrowserPreferences';

export default class FlexBrowserWindow extends HIFullScreenView {
    private static readonly PROTOCOLS = ['http', 'https'];

    public readonly isBrowserWindow = true;

    private history: string[] = [];
    private historyPointer = 0;
    private _ = console.log('FlexBrowserWindow');

    constructor() {
        super(
            new VStack(
                new HStack(
                    new HStack(
                        TaskbarButton(
                            new IonIcon('chevron-back-circle-outline')
                        ).whenClicked(() => this.previousPage()),
                        TaskbarButton(
                            new IonIcon('chevron-forward-circle-outline')
                        ).whenClicked(() => this.nextPage()),
                        new Spacer()
                    )
                        .width('25%')
                        .padding({ left: 10, right: 10 }),

                    new TextField('flex://home')
                        .width({ min: 200, default: '50%', max: 600 })
                        .textCenter()
                        .id('url')
                        .whenChanged(ev => {
                            const browserWindow = ev.view.root(
                                view =>
                                    (view as FlexBrowserWindow).isBrowserWindow
                            ) as FlexBrowserWindow;
                            const icon = browserWindow.getViewById(
                                'url-refresh-button'
                            ) as IonIcon;

                            (icon.body as HTMLInputElement).name =
                                'arrow-forward-outline'; // ! Workaround to use .name
                        })
                        .noOutline()
                        .whenFocused(ev =>
                            ev.view.background(HColor('background')).textStart()
                        )
                        .whenUnfocused(ev =>
                            ev.view.background('none').textCenter()
                        )
                        .whenKeyPressed(ev => {
                            if (ev.key == 'Enter') {
                                const browserWindow = ev.view.root(
                                    view =>
                                        (view as FlexBrowserWindow)
                                            .isBrowserWindow
                                ) as FlexBrowserWindow;
                                const searchbar = this.getViewById(
                                    'url'
                                ) as InputField;
                                browserWindow.goTo(searchbar.model.value);
                            }
                        }),

                    new HStack(
                        TaskbarButton(
                            new IonIcon('refresh-circle-outline').id(
                                'url-refresh-button'
                            )
                        ).whenClicked(ev => {
                            const browserWindow = ev.view.root(
                                view =>
                                    (view as FlexBrowserWindow).isBrowserWindow
                            ) as FlexBrowserWindow;
                            const url = (
                                browserWindow.getViewById('url') as InputField
                            ).model.value;

                            browserWindow.goTo(url);
                        }),
                        new Spacer(),

                        TaskbarButton(
                            new IonIcon('add-circle-outline')
                        ).whenClicked(() => {
                            flexarch.newWindow();
                        })
                    )
                        .width('25%')
                        .padding({ left: 10, right: 10 })
                )
                    .blur()
                    .stretchWidth()
                    .padding()
                    .padding({ top: 20, bottom: 20 })
                    .id('titlebar'),

                new Spacer() // Pushes navbar to top and makes space for Electron.BrowserView
            )
                .stretch()
                .background(HColor('background').alpha(0.5))
        );

        const titlebar = this.getViewById('titlebar') as View;
        titlebar.body.style.setProperty('-webkit-app-region', 'drag');
    }

    private static goodUrl(url: string): string {
        url = url.trim();
        let goodProtocol = false;
        if (url.includes('://')) {
            const givenProtocol = url.substring(0, url.indexOf('://'));
            if (FlexBrowserWindow.PROTOCOLS.indexOf(givenProtocol) >= 0) {
                goodProtocol = true;
            }
        }
        if (!goodProtocol) url = `https://${url}`;

        return url;
    }

    public goTo(url: string, addToHistory = true): void {
        url = FlexBrowserWindow.goodUrl(url);

        const icon = this.getViewById('url-refresh-button') as IonIcon;
        const urlbar = this.getViewById('url') as InputField;

        flexarch.changeUrl(url);
        (icon.body as HTMLInputElement).name = 'refresh-circle-outline'; // ! Workaround to use .name

        if (addToHistory) {
            this.history.push(url);
            this.historyPointer = this.history.length - 1;
        }

        urlbar.model.value = url;
    }

    public previousPage(): void {
        console.log(this);
        this.historyPointer--;
        if (
            this.historyPointer >= 0 &&
            this.historyPointer < this.history.length
        ) {
            this.goTo(this.history[this.historyPointer], false);
            console.log(
                `Navigating back to ${this.history[this.historyPointer]}`
            );
        } else {
            this.historyPointer++;
            console.log('Could not navigate back anymore');
        }
    }

    public nextPage(): void {
        this.historyPointer++;
        if (
            this.historyPointer >= 0 &&
            this.historyPointer < this.history.length
        ) {
            this.goTo(this.history[this.historyPointer]);
            console.log(
                `Navigating forward to ${this.history[this.historyPointer]}`,
                false
            );
        } else {
            this.historyPointer--;
            console.log('Could not navigate more forward');
        }
    }
}

function TaskbarButton(icon: IonIcon) {
    return new ClickButton(
        icon.foreground(BrowserPreferences.getPrimaryColor())
    )
        .rounded()
        .font('xl')
        .padding(3)
        .whenMouseOver(ev => ev.view.background(HColor('gray3')))
        .whenMouseOut(ev => ev.view.background('none'));
}
