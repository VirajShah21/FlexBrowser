declare interface URLMeta {
    title: string;
    url: string;
}

declare namespace flexarch {
    function changeUrl(to: string): void;
    function newWindow(): void;
    function getWindowList(): URLMeta[];
    function getBookmarks(): URLMeta[];
    function addBookmark(bookmark: URLMeta): void;
}
