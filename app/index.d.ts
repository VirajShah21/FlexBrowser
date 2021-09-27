declare interface URLMeta {
    title: string;
    url: string;
}

export function readRC(): Record<string, unknown>;
export function writeRC(data: Record<string, unknown>): void;
export function readBookmarksFile(): URLMeta[];
export function writeBookmarksFile(bookmarks: URLMeta[]): void;
