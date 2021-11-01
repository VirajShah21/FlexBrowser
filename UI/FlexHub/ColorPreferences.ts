import { HighlightColorPreferences } from '@Components/hub/ColorPreferences';
import ThemePreferences from '@Components/hub/ThemePreferences';
import BaseHubWindow from './BaseHubWindow';

export default class ColorPreferences extends BaseHubWindow {
    constructor() {
        super(
            'Color Preferences',
            new HighlightColorPreferences(),
            new ThemePreferences(),
        );
    }
}
