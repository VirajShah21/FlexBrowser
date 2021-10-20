declare type BrandingRegistry = Record<string, Branding>;

declare interface URLMeta {
    title: string;
    url: string;
}

declare interface CustomSearchEngine extends Record<string, string> {
    id: string;
    name: string;
    urlPrefix: string;
}

declare interface FlexRC {
    colorTheme?: string;
    theme?: string;
    searchEngines?: CustomSearchEngine[];
    defaultSearchEngine?: string;
}

declare interface Branding {
    org: string;
    fav: string;
    color: [number, number, number];
    abbr: string;
    logo: string;
    prod: string;
}

declare namespace flexarch {
    function changeUrl(to: string): void;
    function newWindow(): void;
    function getWindowList(): URLMeta[];
    function getBookmarks(): URLMeta[];
    function addBookmark(bookmark: URLMeta): void;
    function pref(property: string, value?: unknown): unknown;
    function getAllPreferences(): {
        colorTheme?: string;
        theme?: string;
    };
    function brandRegistry(rule: string, branding?: Branding): Branding;
}
