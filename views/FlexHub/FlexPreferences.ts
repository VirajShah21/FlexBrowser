import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { navigateBack } from '@UI/triggers/hub-triggers';
import BrowserPreferences from '../BrowserPreferences';
import BrowserFramePreferences from '../components/hub/BrowserFramePreferences';
import HighlightColorPreferences from './components/HighlightColorPreferences';
import HubTitlebar from './components/HubTitlebar';
import ThemePreferences from './components/ThemePreferences';

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
                    'Preferences',
                    new ClickButton(new TextView('Back'))
                        .padding(0)
                        .foreground(HColor(BrowserPreferences.getColorTheme()))
                        .whenClicked(navigateBack)
                        .id('back-btn'),
                    new Spacer(),
                    new ClickButton(new TextView('Reload'))
                        .padding(0)
                        .foreground(HColor(BrowserPreferences.getColorTheme()))
                        .whenClicked(() => window.location.reload()),
                ),

                new HighlightColorPreferences(),

                new ThemePreferences(),

                new BrowserFramePreferences(),

                new Spacer(),
            )
                .stretch()
                .background(HColor('background').alpha(0.75))
                .foreground(HColor('foreground')),
        );
    }
}
