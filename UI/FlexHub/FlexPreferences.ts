import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import Resources from '@Hi/Resources';
import { ViewController } from '@Hi/ViewController';
import BaseHubWindow from './BaseHubWindow';
import ColorPreferences from '../../components/hub/ColorPreferences';
import SearchEnginePreferences from './SearchEnginePreferences';
import IconChangerPreferences from './IconChangerPreferences';
import FeedbackAssistant from './FeedbackAssistant';

export class FlexPreferenceMenuButton extends ClickButton {
    public constructor(public readonly name: string) {
        super(
            new VStack(
                Resources.getImageView(`PreferenceIcons/${name}.png`)
                    .height(64)
                    .width(64),
                new TextView(name)
                    .weight(FontWeight.Medium)
                    .foreground(HColor('gray')),
            ),
        );

        this.width(100).height('100%');
    }
}

/**
 * The main preferences pane in the hub.
 *
 * @export
 * @class FlexPreferences
 * @extends {HIFullScreenView}
 */
export default class FlexPreferences extends BaseHubWindow {
    /**
     * Creates an instance of FlexPreferences.
     *
     * @memberOf FlexPreferences
     */
    constructor() {
        super(
            'Preferences',

            new HStack(
                new FlexPreferenceMenuButton('Colors').whenClicked(() =>
                    ViewController.getController('AppController')?.navigateTo(
                        new ColorPreferences(),
                    ),
                ),

                new FlexPreferenceMenuButton('Search Engines').whenClicked(() =>
                    ViewController.getController('AppController')?.navigateTo(
                        new SearchEnginePreferences(),
                    ),
                ),

                new FlexPreferenceMenuButton('Icon Changer').whenClicked(() =>
                    ViewController.getController('AppController')?.navigateTo(
                        new IconChangerPreferences(),
                    ),
                ),

                new FlexPreferenceMenuButton('Feedback').whenClicked(() =>
                    ViewController.getController('AppController')?.navigateTo(
                        new FeedbackAssistant(),
                    ),
                ),
            )
                .alignStart()
                .width('100%'),
        );
    }
}
