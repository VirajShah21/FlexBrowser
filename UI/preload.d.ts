declare type BrandingRegistry = Record<string, Branding>;

declare interface URLMeta {
    title: string;
    url: string;
    windowId?: number;
}

declare interface CustomSearchEngine extends Record<string, string> {
    id: string;
    name: string;
    urlPrefix: string;
}

declare interface IconTheme {
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

declare interface FlexRC {
    colorTheme?: string;
    theme?: string;
    searchEngines?: CustomSearchEngine[];
    defaultSearchEngine?: string;
    iconTheme?: IconTheme;
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
    function removeBookmark(url: string): void;
    function pref(property: string, value?: unknown): unknown;
    function getAllPreferences(): {
        colorTheme?: string;
        theme?: string;
    };
    function brandRegistry(rule: string, branding?: Branding): Branding;
    function focusWindow(windowId: number): void;
    function focusHub(): void;
    function urlInfo(): URLMeta;
    function hideTaskbar(): void;
    function showTaskbar(): void;
    function setPassword(account: string, password: string): void;
    function getPassword(account: string): Promise<string>;
    function getAccounts(): Promise<{ account: string; password: string }[]>;
    function reloadBrowserView(): void;
    function getHistory(): Promise<string>;
    function log(level: number, message: string): Promise<void>;
}
