import { HColor, HumanColorName, RGBAModel } from '@Hi/Colors';

/**
 * The preferences manager for Flex Browser.
 *
 * @export
 * @class BrowserPreferences
 */
export default class BrowserPreferences {
    private static colorTheme: HumanColorName = 'blue';

    /**
     * Sets the highlight color theme to a specified Human color theme.
     *
     * @static
     * @param {HumanColorName} to The color name to change the theme to.
     *
     * @memberOf BrowserPreferences
     */
    public static setColorTheme(to: HumanColorName): void {
        BrowserPreferences.colorTheme = to;
        localStorage.setItem('flex://color-theme', to);
    }

    /**
     * Gets the highlight color theme name.
     *
     * @static
     * @returns {HumanColorName} The current color theme.
     *
     * @memberOf BrowserPreferences
     */
    public static getColorTheme(): HumanColorName {
        return BrowserPreferences.colorTheme;
    }

    /**
     * Gets the `RGBAModel` of the current color theme.
     *
     * @static
     * @returns {RGBAModel} The current color theme's `RGBAModel`.
     *
     * @memberOf BrowserPreferences
     */
    public static getPrimaryColor(): RGBAModel {
        return HColor(BrowserPreferences.colorTheme);
    }

    /**
     * Initializes all static values for `BrowserPreferences`
     *
     * @static
     *
     * @memberOf BrowserPreferences
     */
    public static initialize(): void {
        BrowserPreferences.colorTheme = (localStorage.getItem(
            'flex://color-theme',
        ) || 'blue') as HumanColorName;
    }
}
