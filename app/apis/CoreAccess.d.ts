declare interface URLMeta {
    title: string;
    url: string;
}

export function readRC(): FlexRC;

export function writeRC(data: FlexRC): void;

export function readBookmarksFile(): URLMeta[];

export function writeBookmarksFile(bookmarks: URLMeta[]): void;

export function readBrandingRegistry(): unknown;

export function writeBrandingRegistry(registry: unknown): void;

export function readHistoryFile(): URLMeta[];

export function writeHistoryFile(history: URLMeta[]): void;
