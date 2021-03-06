import HubTitlebar from '@Components/hub/HubTitlebar';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { defineTransition } from '@Hi/Transitions/Transition';
import { ViewController } from '@Hi/ViewController';
import HubTitles from '@Resources/strings/HubTitles.json';
import BrowserPreferences from '../../Models/BrowserPreferences';
import FlexBookmarksViewer from './FlexBookmarksViewer';
import FlexPreferences from './FlexPreferences';
import FlexWindowsViewer from './FlexWindowsViewer';
import HistoryViewer from './HistoryViewer';
import PasswordManager from './PasswordManager';

const hubButtonBuildIn = defineTransition({
    from: {
        opacity: 0,
    },
    to: {
        opacity: 1,
    },
    iterations: 1,
    duration: 2,
    after: 'forwards',
});

const hubButtonBuildOut = defineTransition({
    to: {
        opacity: 0,
    },
    iterations: 1,
    duration: 2,
    after: 'forwards',
});

/**
 * Specification for icon-label pairs in a button for the Hub's main page.
 *
 * @param {IonIcon} icon The button's icon.
 * @param {string} title The button's label.
 * @returns {ClickButton} The resultant hub button.
 */
function HubButton(icon: string, title: string): ClickButton {
    const btn = new ClickButton(
        new VStack(
            new IonIcon(`${icon}-outline`)
                .font(50)
                .whenMouseOver(async ev => {
                    const { view } = ev;
                    view.name = icon;
                })
                .whenMouseOut(async ev => {
                    const { view } = ev;
                    view.name = `${icon}-outline`;
                })
                .addClass('HubButton-icon'),
            new Spacer(),
            new TextView(title),
        )
            .stretch()
            .alignMiddle(),
    )
        .padding()
        .foreground(HColor(BrowserPreferences.ColorTheme))
        .width(100)
        .height(100)
        .addClass('hub-menu-button');

    btn.handle = (data: string) => {
        if (data === 'hi:buildin') {
            btn.transition(hubButtonBuildIn);
        } else if (data === 'hi:buildout') {
            btn.transition(hubButtonBuildOut);
        }
        (
            btn.getViewsByClass('HubButton-icon')[0] as IonIcon
        ).name = `${icon}-outline`;
    };

    return btn;
}

/**
 * The main screen for the Hub window.
 *
 * @export
 * @class FlexHub
 * @extends {HIFullScreenView}
 */
export default class FlexHub extends HIFullScreenView {
    /**
     * Creates an instance of FlexHub.
     *
     * @memberOf FlexHub
     */
    constructor() {
        super(
            new VStack(
                new HubTitlebar(HubTitles.Main),

                new Spacer(),

                new VStack(
                    new Spacer(),

                    new HStack(
                        new Spacer(),

                        HubButton('albums', 'Windows').whenClicked(() => {
                            ViewController.getController(
                                'AppController',
                            )!.navigateTo(new FlexWindowsViewer(), 1000);
                        }),

                        new Spacer(),

                        HubButton('bookmarks', 'Bookmarks').whenClicked(() => {
                            ViewController.getController(
                                'AppController',
                            )!.navigateTo(new FlexBookmarksViewer(), 1000);
                        }),

                        new Spacer(),

                        HubButton('time', 'History').whenClicked(() =>
                            ViewController.getController(
                                'AppController',
                            )!.navigateTo(new HistoryViewer(), 1000),
                        ),

                        new Spacer(),
                    ).width('100%'),

                    new Spacer(),
                )
                    .width('100%')
                    .foreground(HColor('foreground')),

                new Spacer(),

                new HStack(
                    new Spacer(),

                    HubButton('lock-closed', 'Passwords').whenClicked(() =>
                        ViewController.getController(
                            'AppController',
                        )!.navigateTo(new PasswordManager(), 1000),
                    ),

                    new Spacer(),

                    HubButton('cog', 'Preferences').whenClicked(() =>
                        ViewController.getController(
                            'AppController',
                        )!.navigateTo(new FlexPreferences(), 1000),
                    ),

                    new Spacer(),
                )
                    .width('100%')
                    .foreground(HColor('foreground')),

                new Spacer(),
            )
                .stretch()
                .padding({ top: HubTitlebar.HEIGHT })
                .background(HColor('background').alpha(0.75)),
        );

        this.body.style.setProperty('-webkit-app-region', 'drag');
    }
}
