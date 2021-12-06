import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import ImageView from '@Hi/Components/ImageView';
import TextField from '@Hi/Components/TextField';
import { defineTransition } from '@Hi/Transitions/Transition';
import ValidURL from '@Models/ValidURL';
import {
    urlbarFocusedState,
    urlbarKeyPressed,
    urlbarUnfocusedState,
} from '@Triggers/urlbar-triggers';
import Favicon from './Favicon';
import RefreshTaskbarButton from './RefreshTaskbarButton';

/**
 * The component for the URL entry bar.
 * This includes the favicon, the URL, and a reload button. Additionally, it
 * doubles as a title bar by displaying the title of the current page when the
 * bar is unfocused. When the URLBar refocuses, it will display the URL.
 *
 * @export
 * @class URLBar
 * @extends {HStack}
 */
export default class URLBar extends HStack {
    public readonly buildin = defineTransition({
        from: { opacity: 0 },
        to: { opacity: 1 },
        iterations: 1,
        duration: 1,
        delay: 1,
        after: 'forwards',
    });

    public urlInfo: URLMeta = {
        url: 'flex://home',
        title: 'Flex Homepage',
    };

    /**
     * Creates an instance of URLBar.
     *
     * @memberOf URLBar
     */
    constructor() {
        super(
            new ImageView('../assets/icon.png')
                .id('favicon')
                .width(15)
                .height(15),
            new TextField('flex://home')
                .width('100%')
                .background('none')
                .textCenter()
                .noOutline()
                .border({ size: 0 })
                .whenFocused(urlbarFocusedState)
                .whenUnfocused(urlbarUnfocusedState)
                .whenKeyPressed(urlbarKeyPressed)
                .selectWhenFocused()
                .id('url'),
            new RefreshTaskbarButton(),
        );

        this.width('100%')
            .background('none')
            .foreground(HColor('gray'))
            .border({
                size: 1,
                style: 'solid',
                color: HColor('gray3').alpha(0.5),
            })
            .rounded()
            .opacity(0)
            .padding({ left: 5, right: 5 });
    }

    /**
     * Updates the information of the URLBar.
     *
     *
     * @memberOf URLBar
     */
    public updateURLInfo(): void {
        this.urlInfo = flexarch.urlInfo();
        (this.findViewById('url') as TextField).placeholder =
            this.urlInfo.title;
    }

    /**
     * Retrieves the favicon for the current webpage.
     * This is displayed to  the left of the URL.
     *
     *
     * @memberOf URLBar
     */
    public updateFavicon(): void {
        const favicon = this.findViewById('favicon') as ImageView;
        favicon.source = Favicon.getFaviconURL(
            new ValidURL(this.urlInfo.url),
            'ico',
        );
        const untriedExtensions = ['png', 'svg', 'jpg'];
        favicon.whenError(() => {
            if (untriedExtensions.length > 0) {
                favicon.source = Favicon.getFaviconURL(
                    new ValidURL(this.urlInfo.url),
                    untriedExtensions.splice(0, 1)[0],
                );
            }
        });
    }

    /**
     * Handles the buildin and buildout.
     *
     *
     * @memberOf URLBar
     */
    public override handle(data: string): void {
        if (data === 'hi:buildin') {
            this.transition(this.buildin).then(() => {
                this.opacity(1);
                this.removeTransition();
            });
        } else if (data === 'browser-navigated') {
            this.updateURLInfo();
            this.updateFavicon();
        }
    }
}
