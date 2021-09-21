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

/**
 * Specification for icon-label pairs in a button for the Hub's main page.
 *
 * @param {IonIcon} icon The button's icon.
 * @param {string} title The button's label.
 * @returns {ClickButton} The resultant hub button.
 */
function HubButton(icon: IonIcon, title: string): ClickButton {
    return new ClickButton(
        new VStack(icon.font(50), new Spacer(), new TextView(title))
            .stretch()
            .alignMiddle(),
    )
        .padding()
        .foreground(BrowserPreferences.getPrimaryColor())
        .width(100)
        .height(100);
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
                            ViewController.navigateTo('windows');
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
                        ViewController.navigateTo('bookmarks');
                    }),

                    new Spacer(),

                    HubButton(new IonIcon('time'), 'History'),

                    new Spacer(),

                    HubButton(
                        new IonIcon('cog-outline'),
                        'Preferences',
                    ).whenClicked(() =>
                        ViewController.navigateTo('preferences'),
                    ),

                    new Spacer(),
                ).width('100%'),

                new Spacer(),
            )
                .stretch()
                .background(HColor('background').alpha(0.75))
                .foreground(HColor('foreground')),
        );

        const fadeIn = defineTransition({
            from: {
                opacity: 0,
            },
            '50%': {
                opacity: 0.9,
            },
            to: {
                opacity: 1,
            },
            iterations: 1,
            duration: 3,
            delay: 0,
        });
        this.transition(fadeIn);

        this.body.style.setProperty('-webkit-app-region', 'drag');
    }
}
