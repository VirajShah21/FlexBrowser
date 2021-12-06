import { changeTheme, HumanColorName } from '@Hi/Colors';

/**
 * The preferences manager for Flex Browser.
 *
 * @export
 * @class BrowserPreferences
 */
export default class BrowserPreferences {
    private static readonly DEFAULT_COLOR_THEME = 'blue';

    private static readonly DEFAULT_SEARCH_ENGINE = 'google';

    private static readonly DEFAULT_CUSTOM_SEARCH_ENGINE: CustomSearchEngine = {
        id: 'google',
        name: 'Google Search',
        urlPrefix: 'https://www.google.com/search?q=',
    };

    private static data: FlexRC = {};

    public static initialize(): void {
        const colorTheme: string =
            (flexarch.pref('colorTheme') as string) ??
            BrowserPreferences.DEFAULT_COLOR_THEME;
        const searchEngines: CustomSearchEngine[] =
            (flexarch.pref('searchEngines') as CustomSearchEngine[]) ?? [];
        const defaultSearchEngine: string =
            (flexarch.pref('defaultSearchEngine') as string) ??
            BrowserPreferences.DEFAULT_SEARCH_ENGINE;
        const theme: 'light' | 'dark' = 'light';

        BrowserPreferences.data = {
            theme,
            colorTheme,
            searchEngines,
            defaultSearchEngine,
        };
    }

    public static get theme(): 'light' | 'dark' {
        return BrowserPreferences.data.theme as 'light' | 'dark';
    }

    public static set theme(value: 'light' | 'dark') {
        BrowserPreferences.data.theme = value;
        changeTheme(value);
        flexarch.pref('theme', value);
    }

    public static get ColorTheme(): HumanColorName {
        return (
            (BrowserPreferences.data.colorTheme as HumanColorName) ??
            BrowserPreferences.DEFAULT_COLOR_THEME
        );
    }

    public static set ColorTheme(value: HumanColorName) {
        BrowserPreferences.data.colorTheme = value;
        flexarch.pref('colorTheme', value);
    }

    public static get SearchEngines(): CustomSearchEngine[] {
        return (
            (BrowserPreferences.data.searchEngines as CustomSearchEngine[]) ?? [
                {
                    id: 'google',
                    name: 'Google Search',
                    urlPrefix: 'https://www.google.com/search?q=',
                },
            ]
        );
    }

    public static set SearchEngines(value: CustomSearchEngine[]) {
        BrowserPreferences.data.searchEngines = value;
        flexarch.pref('searchEngines', value);
    }

    public static get DefaultSearchEngine(): string {
        return (
            (BrowserPreferences.data.defaultSearchEngine as string) ?? 'google'
        );
    }

    public static set DefaultSearchEngine(value: string) {
        BrowserPreferences.data.defaultSearchEngine = value;
        flexarch.pref('defaultSearchEngine', value);
    }

    public static get IconTheme(): IconTheme {
        return (flexarch.pref('iconTheme') as IconTheme) ?? {};
    }

    public static set IconTheme(value: IconTheme) {
        BrowserPreferences.data.iconTheme = value;
        flexarch.pref('iconTheme', value);
    }

    public static getDefaultCustomerSearchEngine(): CustomSearchEngine {
        return (
            BrowserPreferences.SearchEngines.find(
                engine => engine.id === BrowserPreferences.DefaultSearchEngine,
            ) ?? BrowserPreferences.DEFAULT_CUSTOM_SEARCH_ENGINE
        );
    }
}
