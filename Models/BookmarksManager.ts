import ValidURL from './ValidURL';

/**
 * The preferences manager for Flex Browser.
 *
 * @export
 * @class BrowserPreferences
 */
export default class BookmarksManager {
    public static getBookmarks(): URLMeta[] {
        return flexarch.getBookmarks();
    }

    public static async addBookmark(meta: URLMeta): Promise<void> {
        flexarch.addBookmark(meta);
    }

    public static isBookmarked(url: ValidURL): boolean {
        const urlString = url.toString();

        return (
            BookmarksManager.getBookmarks().find(
                meta => meta.url === urlString,
            ) !== undefined
        );
    }

    public static async removeBookmark(url: ValidURL): Promise<void> {
        const urlString = url.toString();
        const bookmarks = BookmarksManager.getBookmarks();
        const index = bookmarks.findIndex(meta => meta.url === urlString);
        if (index !== -1) {
            bookmarks.splice(index, 1);
            flexarch.removeBookmark(urlString);
        }
    }
}
