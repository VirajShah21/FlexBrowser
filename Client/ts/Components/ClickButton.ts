import { HColor } from '@Hi/Colors';
import HumanEvent from '@Hi/Types/HumanEvent';
import { SizingValues } from '@Hi/Types/sizing';
import View from '@Hi/View';
import Group from './Group';

export default class ClickButton extends Group<HTMLButtonElement> {
    constructor(...children: View<HTMLElement>[]) {
        super('button', ...children);
        this.body.style.border = 'none';
        this.body.style.color = HColor('blue').toString();
        this.body.style.background = 'none';
        this.body.style.borderRadius = SizingValues.BORDER_RADIUS.xxs;
        this.body.style.padding = `${SizingValues.PADDING.xxs} ${SizingValues.PADDING.sm} ${SizingValues.PADDING.xxs} ${SizingValues.PADDING.sm}`;
        this.body.style.display = 'flex';
    }

    whenClicked(callback: (ev: HumanEvent<this>) => void): this {
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

    disable(): this {
        this.body.disabled = true;
        return this;
    }

    public enable(): this {
        this.body.disabled = false;
        return this;
    }
}
