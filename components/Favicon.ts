import { getAverageRGB } from '@Hi/Colors';
import ImageView from '@Hi/Components/ImageView';
import RGBAModel from '@Hi/RGBAModel';
import HumanEvent from '@Hi/Types/HumanEvent';
import ValidURL from '@Models/ValidURL';

/**
 * A URL-based favicon loader.
 *
 * @export
 * @class Favicon
 * @extends {ImageView}
 */
export default class Favicon extends ImageView {
    public averageColor: RGBAModel;

    public isLight: boolean;

    private whenAnalyzedTriggers: ((ev: HumanEvent<Favicon>) => void)[];

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
        }).whenLoaded(ev => {
            const avg = getAverageRGB(this.body, 1, [RGBAModel.WHITE]);
            this.averageColor = avg;
            this.isLight = avg.isLight();
            this.whenAnalyzedTriggers.forEach(trigger =>
                trigger({
                    view: this,
                    browserEvent: ev.browserEvent,
                    type: 'Analyzed',
                }),
            );
        });
        this.whenAnalyzedTriggers = [];
    }

    public whenAnalyzed(trigger: (ev: HumanEvent<Favicon>) => void): this {
        this.whenAnalyzedTriggers.push(trigger);
        return this;
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
