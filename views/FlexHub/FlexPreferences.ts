import BrowserFramePreferences from '@Components/hub/BrowserFramePreferences';
import HighlightColorPreferences from '@Components/hub/HighlightColorPreferences';
import HubTitlebar from '@Components/hub/HubTitlebar';
import ThemePreferences from '@Components/hub/ThemePreferences';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { navigateBack } from '@Triggers/hub-triggers';
import BrowserPreferences from '@Models/BrowserPreferences';
import HubTitles from '@Resources/strings/HubTitles.json';
import ScrollView from '@Hi/Components/ScrollView';
import SearchEnginePreferences from '@Components/hub/SearchEnginePreferences';

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
                new HubTitlebar(
                    HubTitles.Preferences,
                    new ClickButton(new TextView('Back'))
                        .padding(0)
                        .foreground(HColor(BrowserPreferences.colorTheme))
                        .whenClicked(navigateBack)
                        .id('back-btn'),
                    new Spacer(),
                    new ClickButton(new TextView('Reload'))
                        .padding(0)
                        .foreground(HColor(BrowserPreferences.colorTheme))
                        .whenClicked(() => window.location.reload()),
                ),

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
