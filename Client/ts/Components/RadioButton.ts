import HumanEvent from '@Hi/Types/HumanEvent';
import View from '@Hi/View';

export default class RadioButton extends View {
    private selectedFlag = false;

    constructor() {
        super('ion-icon');
        this.body.setAttribute('name', 'radio-button-off');
        this.body.addEventListener('click', () => {
            this.selected = !this.selected;
        });
    }

    setSelected(value: boolean): this {
        this.selected = value;
        return this;
    }

    isSelected(): boolean {
        return this.selected;
    }

    toggle(): this {
        this.selected = !this.selected;
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

    public get selected(): boolean {
        return this.selectedFlag;
    }

    public set selected(value: boolean) {
        this.selectedFlag = value;
    }
}
