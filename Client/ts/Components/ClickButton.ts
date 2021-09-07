import { HColor } from '@Hi/Colors';
import { SizingValues } from '@Hi/Types/sizing';
import View from '@Hi/View';
import { HumanEvent } from '@Hi/ViewController';

export default class ClickButton extends View {
    public override body: HTMLButtonElement;

    constructor(...children: View[]) {
        super('button', ...children);
        this.body.style.border = 'none';
        this.body.style.color = HColor('blue').toString();
        this.body.style.background = 'none';
        this.body.style.borderRadius = SizingValues.BORDER_RADIUS.xxs;
        this.body.style.padding = `${SizingValues.PADDING.xxs} ${SizingValues.PADDING.sm} ${SizingValues.PADDING.xxs} ${SizingValues.PADDING.sm}`;
        this.body.style.display = 'flex';
        this.alignMiddle();
    }

    whenClicked(callback: (ev: HumanEvent) => void): this {
        this.body.addEventListener('click', browserEvent => {
            callback({
                type: 'Click',
                view: this,
                browserEvent,
            });
        });
        return this;
    }

    noOutline(): this {
        this.body.style.outline = 'none';
        return this;
    }
}
