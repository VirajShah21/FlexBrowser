import View from '@Hi/View';
import HumanEvent from '@Hi/Types/HumanEvent';

export default class Checkbox extends View {
    private checkedFlag: boolean;

    private icons: {
        checked: string;
        unchecked: string;
    };

    constructor(
        checked = false,
        checkedIcon = 'square-outline',
        uncheckedIcon = 'checkbox',
    ) {
        super('ion-icon');
        this.checkedFlag = checked;
        this.icons = { checked: checkedIcon, unchecked: uncheckedIcon };
        this.body.setAttribute('name', 'square-outline');
        this.body.addEventListener('click', () => {
            this.checked = !this.checked;
        });
    }

    toggle(): boolean {
        this.checked = !this.checked;
        return this.checked;
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

    public get checked(): boolean {
        return this.checkedFlag;
    }

    public set checked(val: boolean) {
        this.checkedFlag = val;
        (this.body as HTMLInputElement).name = this.checkedFlag
            ? 'checkbox'
            : 'square-outline';
    }
}
