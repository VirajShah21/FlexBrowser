import BrowserFramePreferences from '@Components/hub/BrowserFramePreferences';
import HighlightColorPreferences from '@Components/hub/HighlightColorPreferences';
import HubTitlebar from '@Components/hub/HubTitlebar';
import SearchEnginePreferences from '@Components/hub/SearchEnginePreferences';
import ThemePreferences from '@Components/hub/ThemePreferences';
import { HColor } from '@Hi/Colors';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import ScrollView from '@Hi/Components/ScrollView';
import VStack from '@Hi/Components/VStack';
import HubTitles from '@Resources/strings/HubTitles.json';

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
                    new HighlightColorPreferences(),

                    new ThemePreferences(),

                    new BrowserFramePreferences(),

                    new SearchEnginePreferences(),
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
