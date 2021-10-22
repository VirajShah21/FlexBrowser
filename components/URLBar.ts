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
import RefreshTaskbarButton from './RefreshTaskbarButton';

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

        window.setInterval(() => {
            this.updateURLInfo();
        }, 1000);

        window.setInterval(() => {
            this.updateFavicon();
        }, 5000);
    }

    public updateURLInfo(): void {
        this.urlInfo = flexarch.urlInfo();
        (this.findViewById('url') as TextField).placeholder =
            this.urlInfo.title;
    }

    public updateFavicon(): void {
        const favicon = this.findViewById('favicon') as ImageView;
        favicon.source = URLBar.getFaviconURL(this.urlInfo, 'ico');
        const untriedExtensions = ['png', 'svg', 'jpg'];
        favicon.whenError(() => {
            if (untriedExtensions.length > 0) {
                favicon.source = URLBar.getFaviconURL(
                    this.urlInfo,
                    untriedExtensions.splice(0, 1)[0],
                );
            }
        });
    }

    public static getFaviconURL(meta: URLMeta, extension = 'ico'): string {
        const url = new ValidURL(meta.url);
        return `${url.protocol}://${url.domain}/favicon.${extension}`;
    }

    public override handle(data: string): void {
        if (data === 'hi:buildin') {
            this.transition(this.buildin).then(() => {
                this.opacity(1);
                this.removeTransition();
            });
        }
    }
}
