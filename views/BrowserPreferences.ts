import { HumanColorName } from '@Hi/Colors';
import HumanColorSwatch from '@Hi/HumanColorSwatch';

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
            ret = (flexarch.pref('colorTheme') as string | undefined) || 'blue';

            try {
                BrowserPreferences.assertIsHumanColorName(ret);
            } catch (err) {
                ret = 'blue';
            }

            BrowserPreferences.cache.colorTheme = ret;
            BrowserPreferences.uncache('colorTheme');
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
        BrowserPreferences.uncache('colorTheme');
    }

    public static get searchEngines(): CustomSearchEngine[] {
        let ret = BrowserPreferences.cache.searchEngines;

        try {
            BrowserPreferences.assertIsArrayOfCustomSearchEngine(ret);
        } catch (e) {
            try {
                ret =
                    (flexarch.pref('searchEngines') as CustomSearchEngine[]) ||
                    [];
                BrowserPreferences.assertIsArrayOfCustomSearchEngine(ret);
            } catch (err) {
                ret = [];
            }
            BrowserPreferences.cache.searchEngines = ret;
            BrowserPreferences.uncache('searchEngines');
        }

        return ret;
    }

    public static set searchEngines(list: CustomSearchEngine[]) {
        BrowserPreferences.cache.searchEngines = list;
        flexarch.pref('searchEngines', list);
        BrowserPreferences.uncache('searchEngines');
    }

    public static get defaultSearchEngine(): CustomSearchEngine {
        let id = BrowserPreferences.cache.defaultSearchEngine;

        try {
            BrowserPreferences.assertIsCustomSearchEngineObject(
                BrowserPreferences.searchEngines.find(
                    engine => engine.id === id,
                ),
            );
        } catch (e) {
            id = flexarch.pref('defaultSearchEngine') as string;
            try {
                BrowserPreferences.assertIsCustomSearchEngineObject(
                    BrowserPreferences.searchEngines.find(
                        engine => engine.id === id,
                    ),
                );
            } catch (e2) {
                return {
                    id: 'google',
                    name: 'Google',
                    urlPrefix: 'https://google.com/search?q=',
                };
            }

            BrowserPreferences.cache.defaultSearchEngine = id;
            BrowserPreferences.uncache('defaultSearchEngine');
        }
        return BrowserPreferences.searchEngines.find(
            engine => engine.id === id,
        )!;
    }

    public static set defaultSearchEngine(id: string | CustomSearchEngine) {
        if (typeof id === 'string') {
            BrowserPreferences.cache.defaultSearchEngine = id;
            flexarch.pref('defaultSearchEngine', id);
            BrowserPreferences.uncache('defaultSearchEngine');
        } else {
            BrowserPreferences.cache.defaultSearchEngine = id.id;
            flexarch.pref('defaultSearchEngine', id.id);
            BrowserPreferences.uncache('defaultSearchEngine');
        }
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

    private static assertIsCustomSearchEngineObject(
        obj?: unknown,
    ): asserts obj is CustomSearchEngine {
        if (obj === undefined) throw new Error('Object is undefined');

        if (!Object.prototype.hasOwnProperty.call(obj, 'id')) {
            throw new Error(
                `Object is not CustomSearchEngine object. Missing 'id' field: ${JSON.stringify(
                    obj,
                    null,
                    4,
                )}.`,
            );
        }

        if (!Object.prototype.hasOwnProperty.call(obj, 'name')) {
            throw new Error(
                `Object is not CustomSearchEngine object. Missing 'name' field: ${JSON.stringify(
                    obj,
                    null,
                    4,
                )}.`,
            );
        }

        if (!Object.prototype.hasOwnProperty.call(obj, 'urlPrefix')) {
            throw new Error(
                `Object is not CustomSearchEngine object. Missing 'urlPrefix' field: ${JSON.stringify(
                    obj,
                    null,
                    4,
                )}.`,
            );
        }
    }

    private static assertIsArrayOfCustomSearchEngine(
        arr?: unknown[],
    ): asserts arr is CustomSearchEngine[] {
        if (arr === undefined) throw new Error('Object is undefined');
        arr.forEach(item =>
            BrowserPreferences.assertIsCustomSearchEngineObject(item),
        );
    }
}
