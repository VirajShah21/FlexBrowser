import URLMeta from './URLMeta';

declare namespace flexarch {
    function changeUrl(to: string): void;
    function newWindow(): void;
    function getWindowList(): URLMeta[];
    function fillWindowList(list: URLMeta[]): void;
}
