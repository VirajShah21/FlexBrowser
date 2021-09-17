import { HColor, HumanColorName } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import BrowserPreferences from 'src/BrowserPreferences';

export default class HighlightColorButton extends ClickButton {
    constructor(color: HumanColorName) {
        super(new IonIcon('ellipse').font('xxl').foreground(HColor(color)));
        this.id(`highlight-${color}`)
            .addClass('highlight-radio')
            .padding(0)
            .whenClicked(ev => {
                BrowserPreferences.setColorTheme(color);
                ev.view
                    .root()
                    .getViewsByClass('highlight-radio')
                    .forEach(view =>
                        view.borderBottom({
                            size: 0,
                        }),
                    );
                ev.view
                    .root()
                    .getViewById(`highlight-${color}`)
                    ?.borderBottom({
                        size: 3,
                        style: 'solid',
                        color: HColor('foreground'),
                    });
            });
    }
}
