import ValidURL from './ValidURL';

/**
 * The preferences manager for Flex Browser.
 *
 * @export
 * @class BrowserPreferences
 */
export default class BookmarksManager {
    private static cache: URLMeta[] = flexarch.getBookmarks();

    /**
     * Uncaches a property from `BookmarksManager.cache` after 60 seconds.
     *
     * @param prop The property to uncache
     */
    public static uncache(prop: string): void {
        window.setTimeout(() => {
            Object.defineProperty(BookmarksManager.cache, prop, {
                value: undefined,
                writable: true,
            });
        }, 60000); // Uncache every 60 seconds
    }

    public static getBookmarks(): URLMeta[] {
        this.cache = flexarch.getBookmarks();
        return this.cache;
    }

    public static async addBookmark(meta: URLMeta): Promise<void> {
        flexarch.addBookmark(meta);
        this.cache.push(meta);
    }

    public static isBookmarked(url: ValidURL): boolean {
        const urlString = url.toString();
        return this.cache.find(meta => meta.url === urlString) !== undefined;
    }

    public static async removeBookmark(url: ValidURL): Promise<void> {
        const urlString = url.toString();
        const index = this.cache.findIndex(meta => meta.url === urlString);
        if (index !== -1) {
            this.cache.splice(index, 1);
            flexarch.removeBookmark(urlString);
        }
    }
}
