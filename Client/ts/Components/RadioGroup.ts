import RadioButton from './RadioButton';

export default class RadioGroup {
    public radios: RadioButton[];

    constructor(...radioButtons: RadioButton[]) {
        this.radios = radioButtons;
        this.radios.forEach(radio => {
            radio.whenClicked(() => {
                this.radios.forEach(otherRadio => {
                    if (otherRadio !== radio) otherRadio.setSelected(false);
                });
            });
        });
    }

    getSelected(): RadioButton | null {
        for (let i = 0; i < this.radios.length; i += 1) {
            const curr = this.radios[i];
            if (curr !== undefined) if (curr.isSelected()) return curr;
        }
        return null;
    }
}
