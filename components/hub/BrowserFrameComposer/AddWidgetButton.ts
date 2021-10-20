import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import BrowserPreferences from '@Models/BrowserPreferences';
import AddWidgetOverlay from '@UI/FlexHub/BrowserFrameComposer/AddWidgetOverlay';

export default class AddWidgetButton extends ClickButton {
    private partition: number;

    private index: number;

    constructor(partition: number, index: number) {
        super(new IonIcon('hammer'));

        this.partition = partition;
        this.index = index;

        this.foreground(HColor(BrowserPreferences.colorTheme)).whenClicked(
            () => new AddWidgetOverlay(partition, index),
        );
    }
}
