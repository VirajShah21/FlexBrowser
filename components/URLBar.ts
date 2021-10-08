import { HColor } from '@Hi/Colors';
import TextField from '@Hi/Components/TextField';
import {
    changeReloadButtonToGoButton,
    urlbarFocusedState,
    urlbarKeyPressed,
    urlbarUnfocusedState,
} from '@UI/triggers/urlbar-triggers';

export default class URLBar extends TextField {
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
            .whenKeyPressed(urlbarKeyPressed);
    }
}
