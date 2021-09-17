import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from '../BrowserPreferences';
import BrowserFramePreferences from './components/BrowserFramePreferences';
import HighlightColorPreferences from './components/HighlightColorPreferences';
import HubTitlebar from './components/HubTitlebar';
import ThemePreferences from './components/ThemePreferences';

export default class FlexPreferences extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new HubTitlebar(
                    'Preferences',
                    new ClickButton(new TextView('Back'))
                        .padding(0)
                        .foreground(HColor(BrowserPreferences.getColorTheme()))
                        .whenClicked(() =>
                            ViewController.getController(
                                'AppController',
                            )!.navigateTo('hub'),
                        ),
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
