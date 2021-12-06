import { HumanColorName } from '@Hi/Colors';

export interface IconTheme {
    backForward?:
        | 'chevron'
        | 'chevron-circle-outline'
        | 'chevron-circle-filled'
        | 'arrow'
        | 'arrow-circle-outline'
        | 'arrow-circle-filled'
        | 'caret'
        | 'caret-circle-outline'
        | 'caret-circle-filled'
        | 'return';
    reload?:
        | 'default'
        | 'default-circle'
        | 'default-circle-filled'
        | 'alternative'
        | 'alternative-circle'
        | 'alternative-circle-filled';
    hub?:
        | 'home'
        | 'home-filled'
        | 'dots'
        | 'dots-filled'
        | 'grid'
        | 'grid-filled'
        | 'rocket'
        | 'rocket-filled';
}

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
        flexarch.pref('theme', value);
    }

    public static get ColorTheme(): HumanColorName {
        return BrowserPreferences.data.colorTheme as HumanColorName;
    }

    public static set ColorTheme(value: HumanColorName) {
        BrowserPreferences.data.colorTheme = value;
        flexarch.pref('colorTheme', value);
    }

    public static get SearchEngines(): CustomSearchEngine[] {
        return BrowserPreferences.data.searchEngines as CustomSearchEngine[];
    }

    public static set SearchEngines(value: CustomSearchEngine[]) {
        BrowserPreferences.data.searchEngines = value;
        flexarch.pref('searchEngines', value);
    }

    public static get DefaultSearchEngine(): string {
        return BrowserPreferences.data.defaultSearchEngine as string;
    }

    public static set DefaultSearchEngine(value: string) {
        BrowserPreferences.data.defaultSearchEngine = value;
        flexarch.pref('defaultSearchEngine', value);
    }

    public static getDefaultCustomerSearchEngine(): CustomSearchEngine {
        return (
            BrowserPreferences.SearchEngines.find(
                engine => engine.id === BrowserPreferences.DefaultSearchEngine,
            ) ?? BrowserPreferences.DEFAULT_CUSTOM_SEARCH_ENGINE
        );
    }
}
