import { HColor } from '@Hi/Colors';
import { SizingValues } from '@Hi/Types/sizing';
import { StateObject } from '@Hi/Types/states';
import View from '@Hi/View';
import { HumanEvent, HumanKeyPressEvent } from '@Hi/ViewController';

export default class InputField extends View {
    public override body: HTMLInputElement;

    public readonly model = StateObject(
        {
            value: '',
            placeholder: '',
        },
        () => {
            this.body.value = this.model.value; // ! Cannot use setAttribute for assigning input element's value
            this.body.placeholder = this.model.placeholder;
        }
    );

    constructor(placeholder: string) {
        super('input');
        this.model.value = '';
        this.model.placeholder = placeholder || '';
        this.body.style.margin = '0';
        this.body.style.boxSizing = 'border-box';
        this.body.style.borderRadius = SizingValues.BORDER_RADIUS.xs;
        this.body.style.border = `1px solid ${HColor('gray5')}`;
        this.body.style.textAlign = 'left';
        this.body.style.padding = SizingValues.PADDING.xs;
        this.body.style.boxSizing = 'border-box';
        this.body.addEventListener('input', () => {
            this.model.value = this.body.value;
        });
    }

    whenFocused(callback: (event: HumanEvent) => void): this {
        this.body.addEventListener('focusin', browserEvent => {
            callback({
                view: this,
                type: 'Focus',
                browserEvent,
            });
        });
        return this;
    }

    whenUnfocused(callback: (event: HumanEvent) => void): this {
        this.body.addEventListener('focusout', browserEvent => {
            callback({
                view: this,
                type: 'Unfocus',
                browserEvent,
            });
        });
        return this;
    }

    whenChanged(callback: (event: HumanEvent) => void): this {
        this.body.addEventListener('input', browserEvent => {
            callback({
                view: this,
                type: 'Change',
                browserEvent,
            });
        });
        return this;
    }

    whenKeyPressed(callback: (event: HumanKeyPressEvent) => void): this {
        this.body.addEventListener('keypress', browserEvent => {
            callback({
                view: this,
                type: 'KeyPress',
                browserEvent,
                key: browserEvent.key,
            });
        });
        return this;
    }

    noOutline(): this {
        this.body.style.outline = 'none';
        return this;
    }
}
