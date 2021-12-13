import { HColor } from '@Hi/Colors';
import View from '@Hi/View';

export default class Overlay extends View<HTMLDivElement> {
    constructor(...children: View<HTMLDivElement>[]) {
        super('div', ...children);
        this.background(HColor('background').alpha(0.25))
            .foreground(HColor('foreground'))
            .width('100vw')
            .height('100vh')
            .zIndex(100)
            .fixed()
            .setTop(0)
            .setLeft(0)
            .blur();
        document.body.appendChild(this.body);
    }
}
