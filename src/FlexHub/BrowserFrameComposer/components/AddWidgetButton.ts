import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import BrowserPreferences from 'src/BrowserPreferences';
import AddWidgetOverlay from '../AddWidgetOverlay';

export default class AddWidgetButton extends ClickButton {
    private partition: number;

    private index: number;

    constructor(partition: number, index: number) {
        super(new IonIcon('hammer'));

        this.partition = partition;
        this.index = index;

        this.foreground(BrowserPreferences.getPrimaryColor()).whenClicked(
            () => new AddWidgetOverlay(partition, index),
        );
    }
}
