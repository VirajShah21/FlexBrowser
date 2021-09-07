import { StateObject } from '@Hi/Types/states';
import View from '@Hi/View';
import { HumanEvent } from '@Hi/ViewController';

export default class Checkbox extends View {
    public readonly state = StateObject({ checked: false }, () => {
        this.body.setAttribute('name', this.state.checked ? 'checkbox' : 'square-outline');
    });

    constructor() {
        super('ion-icon');
        this.body.setAttribute('name', 'square-outline');
        this.body.addEventListener('click', () => {
            this.state.checked = !this.state.checked;
        });
    }

    setChecked(value: boolean): this {
        this.state.checked = value;
        return this;
    }

    isChecked(): boolean {
        return this.state.checked;
    }

    toggle(): boolean {
        this.state.checked = !this.state.checked;
        return this.state.checked;
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
