import ImageView from '@Hi/Components/ImageView';
import ValidURL from '@Models/ValidURL';

/**
 * A URL-based favicon loader.
 *
 * @export
 * @class Favicon
 * @extends {ImageView}
 */
export default class Favicon extends ImageView {
    /**
     * Creates an instance of Favicon.
     * @param {ValidURL} url The URL for which to load the favicon.
     *
     * @memberOf Favicon
     */
    constructor(url: ValidURL) {
        super(Favicon.getFaviconURL(url));
        this.rounded('100%').width(36).height(36);

        const untriedExtensions = ['png', 'svg', 'jpg'];
        this.whenError(() => {
            if (untriedExtensions.length > 0) {
                this.source = Favicon.getFaviconURL(
                    url,
                    untriedExtensions.splice(0, 1)[0],
                );
            }
        });
    }

    /**
     * Builds a potential favicon URL.
     *
     * @static
     * @param {ValidURL} url The URL for which to load the favicon.
     * @param {string} [extension='ico'] The favicon image file extension.
     * @returns {string} The built favicon URL as a string.
     *
     * @memberOf Favicon
     */
    public static getFaviconURL(url: ValidURL, extension = 'ico'): string {
        return `${url.protocol}://${url.domain}/favicon.${extension}`;
    }
}
