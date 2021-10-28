import HubTitlebar from '@Components/hub/HubTitlebar';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ScrollView from '@Hi/Components/ScrollView';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import Resources from '@Hi/Resources';
import HubTitles from '@Resources/strings/HubTitles.json';

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

        this.width(100).height(100);
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
                        new TextView('Styles')
                            .font('md')
                            .bold()
                            .margin({ bottom: 10 })
                            .width('100%')
                            .textStart()
                            .foreground(HColor('gray')),
                        new HStack(
                            new FlexPreferenceMenuButton('Colors'),
                            new FlexPreferenceMenuButton('Browser Frame'),
                        )
                            .alignStart()
                            .width('100%'),
                        new TextView('Search & Navigation')
                            .font('md')
                            .bold()
                            .margin({ bottom: 10 })
                            .width('100%')
                            .textStart()
                            .foreground(HColor('gray')),
                        new HStack(
                            new FlexPreferenceMenuButton('Search Engines'),
                        )
                            .alignStart()
                            .width('100%'),
                    ),
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
