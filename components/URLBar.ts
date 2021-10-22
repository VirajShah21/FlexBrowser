import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import TextField from '@Hi/Components/TextField';
import { defineTransition } from '@Hi/Transitions/Transition';
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
                color: HColor('gray6').alpha(0.5),
            })
            .rounded()
            .opacity(0)
            .padding({ left: 5, right: 5 });

        window.setInterval(() => {
            this.updateURLInfo();
        }, 1000);
    }

    public updateURLInfo(): void {
        this.urlInfo = flexarch.urlInfo();
        (this.findViewById('url') as TextField).placeholder =
            this.urlInfo.title;
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
