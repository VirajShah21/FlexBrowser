import { HColor } from '@Hi/Colors';
import TextField from '@Hi/Components/TextField';
import { defineTransition } from '@Hi/Transitions/Transition';
import {
    changeReloadButtonToGoButton,
    urlbarFocusedState,
    urlbarUnfocusedState,
    urlbarKeyPressed,
} from '@Triggers/urlbar-triggers';

export default class URLBar extends TextField {
    public readonly buildin = defineTransition({
        from: { opacity: 0 },
        to: { opacity: 1 },
        iterations: 1,
        duration: 1,
        delay: 1,
        after: 'forwards',
    });

    constructor() {
        super('flex://home');

        this.width('100%')
            .textCenter()
            .background('none')
            .foreground(HColor('gray'))
            .id('url')
            .whenChanged(changeReloadButtonToGoButton)
            .noOutline()
            .whenFocused(urlbarFocusedState)
            .whenUnfocused(urlbarUnfocusedState)
            .whenKeyPressed(urlbarKeyPressed)
            .opacity(0);
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
