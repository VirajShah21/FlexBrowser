import HubTitlebar from '@Components/hub/HubTitlebar';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ScrollView from '@Hi/Components/ScrollView';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import Resources from '@Hi/Resources';
import { ViewController } from '@Hi/ViewController';
import HubTitles from '@Resources/strings/HubTitles.json';
import BrowserFramePreferences from './BrowserFramePreferences';
import ColorPreferences from './ColorPreferences';
import SearchEnginePreferences from './SearchEnginePreferences';

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
export default class FlexPreferences extends HIFullScreenView {
    /**
     * Creates an instance of FlexPreferences.
     *
     * @memberOf FlexPreferences
     */
    constructor() {
        super(
            new VStack(
                new HubTitlebar(HubTitles.Preferences).insertBackButton(true),

                new ScrollView(
                    // new HighlightColorPreferences(),

                    // new ThemePreferences(),

                    // new BrowserFramePreferences(),

                    // new SearchEnginePreferences(),

                    new VStack(
                        new HStack(
                            new FlexPreferenceMenuButton('Colors').whenClicked(
                                () =>
                                    ViewController.getController(
                                        'AppController',
                                    )?.navigateTo(new ColorPreferences()),
                            ),

                            new FlexPreferenceMenuButton(
                                'Search Engines',
                            ).whenClicked(() =>
                                ViewController.getController(
                                    'AppController',
                                )?.navigateTo(new SearchEnginePreferences()),
                            ),

                            new FlexPreferenceMenuButton(
                                'Browser Frame',
                            ).whenClicked(() =>
                                ViewController.getController(
                                    'AppController',
                                )?.navigateTo(new BrowserFramePreferences()),
                            ),
                        )
                            .alignStart()
                            .width('100%'),
                    ).padding(),
                )
                    .height('100%')
                    .width('100%')
                    .padding({ top: HubTitlebar.HEIGHT }),
            )
                .stretch()
                .background(HColor('background').alpha(0.75))
                .foreground(HColor('foreground')),
        );
    }
}
