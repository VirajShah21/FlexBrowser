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
import BrowserPreferences from '../BrowserPreferences';
import HubTitlebar from './components/HubTitlebar';

const hubButtonBuildIn = defineTransition({
    from: {
        opacity: 0,
    },
    to: {
        opacity: 1,
    },
    iterations: 1,
    duration: 5,
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
function HubButton(icon: IonIcon, title: string): ClickButton {
    const btn = new ClickButton(
        new VStack(icon.font(50), new Spacer(), new TextView(title))
            .stretch()
            .alignMiddle(),
    )
        .padding()
        .foreground(BrowserPreferences.getPrimaryColor())
        .width(100)
        .height(100);

    btn.handle = (data: string) => {
        if (data === 'hi:buildin') {
            btn.transition(hubButtonBuildIn);
        } else if (data === 'hi:buildout') {
            btn.transition(hubButtonBuildOut);
        }
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
                new HubTitlebar('Flex Hub'),

                new Spacer(),

                new HStack(
                    new Spacer(),

                    HubButton(new IonIcon('albums'), 'Windows').whenClicked(
                        () => {
                            ViewController.navigateTo('windows', 1000);
                            ViewController.getController(
                                'AppController',
                            )?.signal('refresh-windows');
                        },
                    ),

                    new Spacer(),

                    HubButton(
                        new IonIcon('bookmarks'),
                        'Bookmarks',
                    ).whenClicked(() => {
                        ViewController.navigateTo('bookmarks', 1000);
                    }),

                    new Spacer(),

                    HubButton(new IonIcon('time'), 'History'),

                    new Spacer(),

                    HubButton(
                        new IonIcon('cog-outline'),
                        'Preferences',
                    ).whenClicked(() =>
                        ViewController.navigateTo('preferences', 1000),
                    ),

                    new Spacer(),
                ).width('100%'),

                new Spacer(),
            )
                .stretch()
                .background(HColor('background').alpha(0.75))
                .foreground(HColor('foreground')),
        );

        this.body.style.setProperty('-webkit-app-region', 'drag');
    }
}
