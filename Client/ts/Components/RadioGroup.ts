import RadioButton from './RadioButton';

export default class RadioGroup {
    public radios: RadioButton[];

    constructor(...radioButtons: RadioButton[]) {
        this.radios = radioButtons;
        this.radios.forEach(radio => {
            radio.whenClicked(() => {
                this.radios.forEach(otherRadio => {
                    if (otherRadio != radio) otherRadio.setSelected(false);
                });
            });
        });
    }

    getSelected(): RadioButton | null {
        for (const radio of this.radios) if (radio.isSelected()) return radio;
        return null;
    }
}
