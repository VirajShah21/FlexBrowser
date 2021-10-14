import { HColor, HumanColorName } from '@Hi/Colors';
import HumanColorSwatch from '@Hi/HumanColorSwatch';
import RGBAModel from '@Hi/RGBAModel';

/**
 * The preferences manager for Flex Browser.
 *
 * @export
 * @class BrowserPreferences
 */
export default class BrowserPreferences {
    private static cache: FlexRC = {};

    /**
     * Uncaches a property from `BrowserPreferences.cache` after 60 seconds.
     *
     * @param prop The property to uncache
     */
    public static uncache(prop: string): void {
        window.setTimeout(() => {
            Object.defineProperty(BrowserPreferences.cache, prop, null!);
        }, 60000); // Uncache every 60 seconds
    }

    /**
     * Fetches the name of the color theme.
     *
     * Order of access:
     *
     * 1. Cache (cleared every 60 seconds)
     * 2. ~/.flexrc
     * 3. 'blue'
     *
     * @static
     * @type {HumanColorName}
     * @memberOf BrowserPreferences
     */
    public static get colorTheme(): HumanColorName {
        let ret = BrowserPreferences.cache.colorTheme;

        try {
            BrowserPreferences.assertIsHumanColorName(ret);
        } catch (e) {
            ret = flexarch.pref('colorTheme') || 'blue';
            BrowserPreferences.assertIsHumanColorName(ret);
            try {
                BrowserPreferences.assertIsHumanColorName(ret);
            } catch (err) {
                ret = 'blue';
            }
        }
        return ret as HumanColorName;
    }

    /**
     * Sets the name of the color theme. This updates the cache and
     * `~/.flexrc`.
     *
     * @static
     *
     * @memberOf BrowserPreferences
     */
    public static set colorTheme(name: HumanColorName) {
        BrowserPreferences.cache.colorTheme = name;
        flexarch.pref('colorTheme', name);
    }

    private static assertIsHumanColorName(
        s?: string,
    ): asserts s is HumanColorName {
        if (!Object.prototype.hasOwnProperty.call(HumanColorSwatch.dark, s)) {
            throw new Error(`${s} is not a HumanColorName.`);
        }
    }

    private static assertIsTheme(
        name?: string,
    ): asserts name is 'light' | 'dark' {
        if (name && name !== 'light' && name !== 'dark') {
            throw new Error(`${name} is not either "light" or "dark"`);
        }
    }
}
