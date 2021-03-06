import { HighlightColorPreferences } from '@Components/hub/HighlightColorPreferences';
import ThemePreferences from '@Components/hub/ThemePreferences';
import BaseHubWindow from '../../UI/FlexHub/BaseHubWindow';

export default class ColorPreferences extends BaseHubWindow {
    constructor() {
        super(
            'Color Preferences',
            new HighlightColorPreferences(),
            new ThemePreferences(),
        );
    }
}
