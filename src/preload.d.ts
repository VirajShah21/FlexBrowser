declare namespace flexarch {
    function changeUrl(to: string): void;
    function newWindow(): void;
    function getWindowList(): { title: string }[];
    function fillWindowList(list: { title: string }[]): void;
}
