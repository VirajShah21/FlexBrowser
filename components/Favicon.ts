import ImageView from '@Hi/Components/ImageView';
import ValidURL from '@Models/ValidURL';

export default class Favicon extends ImageView {
    constructor(url: ValidURL) {
        super(Favicon.getFaviconURL(url));
        this.rounded('100%').width(36).height(36).padding(5);

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

    public static getFaviconURL(url: ValidURL, extension = 'ico'): string {
        return `${url.protocol}://${url.domain}/favicon.${extension}`;
    }
}
