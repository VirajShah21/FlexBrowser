declare namespace flexarch {
    function changeUrl(to: string): void;
    function newWindow(): void;
    function getWindowList(): void;
    function fillWindowList(list: WebContents[]): void;
}
