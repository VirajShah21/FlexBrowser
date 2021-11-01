import { HColor } from '@Hi/Colors';
import HumanEvent, { HumanKeyPressEvent } from '@Hi/Types/HumanEvent';
import { SizingValues } from '@Hi/Types/sizing';
import View from '@Hi/View';

export default class InputField extends View {
    private whenChangedListeners: ((ev: Event) => void)[] = [];

    public override body: HTMLInputElement;

    constructor(placeholder: string) {
        super('input');
        this.body.style.margin = '0';
        this.body.style.boxSizing = 'border-box';
        this.body.style.borderRadius = SizingValues.BORDER_RADIUS.xs;
        this.body.style.border = `1px solid ${HColor('gray5')}`;
        this.body.style.textAlign = 'left';
        this.body.style.padding = SizingValues.PADDING.xs;
        this.body.style.boxSizing = 'border-box';
        this.body.placeholder = placeholder;
        this.background(HColor('background'))
            .foreground(HColor('foreground'))
            .noOutline();
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
        const listener = (browserEvent: Event) => {
            callback({
                view: this,
                type: 'Change',
                browserEvent,
            });
        };
        this.body.addEventListener('input', listener);
        this.whenChangedListeners.push(listener);
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

    public select(): this {
        this.body.select();
        return this;
    }

    public selectWhenFocused(): this {
        this.body.addEventListener('focusin', () => this.body.select());
        return this;
    }

    public get value(): string {
        return this.body.value;
    }

    public set value(newValue: string) {
        this.body.value = newValue;
        this.whenChangedListeners.forEach(listener =>
            listener({} as unknown as Event),
        );
    }

    public get placeholder(): string {
        return this.body.placeholder;
    }

    public set placeholder(newPlaceholder: string) {
        this.body.placeholder = newPlaceholder;
    }
}
