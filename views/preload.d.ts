declare interface URLMeta {
    title: string;
    url: string;
}

declare interface FlexRC {
    colorTheme?: string;
    theme?: string;
    searchEngines?: { name: string; urlPrefix: string }[];
}

declare namespace flexarch {
    function changeUrl(to: string): void;
    function newWindow(): void;
    function getWindowList(): URLMeta[];
    function getBookmarks(): URLMeta[];
    function addBookmark(bookmark: URLMeta): void;
    function pref(property: string, value?: string): string | null;
    function getAllPreferences(): {
        colorTheme?: string;
        theme?: string;
    };
}
