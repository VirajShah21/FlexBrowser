import { StateObject } from '@Hi/Types/states';
import View from '@Hi/View';
import { HumanEvent } from '@Hi/ViewController';

export default class RadioButton extends View {
    public readonly state = StateObject({ selected: false }, () => {
        this.body.setAttribute(
            'name',
            this.state.selected ? 'radio-button-on' : 'radio-button-off'
        );
    });

    constructor() {
        super('ion-icon');
        this.body.setAttribute('name', 'radio-button-off');
        this.body.addEventListener('click', () => {
            this.state.selected = !this.state.selected;
        });
    }

    setSelected(value: boolean): this {
        this.state.selected = value;
        return this;
    }

    isSelected(): boolean {
        return this.state.selected;
    }

    toggle(): this {
        this.state.selected = !this.state.selected;
        return this;
    }

    whenClicked(callback: (ev: HumanEvent) => void): this {
        this.body.addEventListener('click', (browserEvent: Event) => {
            callback({
                type: 'Click',
                view: this,
                browserEvent,
            });
        });
        return this;
    }
}
