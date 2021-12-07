import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { HumanColorName } from '@Hi/Types/colors';
import highlightColorSelected from '@Triggers/preferences-triggers';

/**
 * Creates a circle icon with a specified color. The button binds to a
 * handler which assigns the browser's color theme.
 *
 * @export
 * @class HighlightColorButton
 * @extends {ClickButton}
 */
export class HighlightColorButton extends ClickButton {
    /**
     * Creates an instance of HighlightColorButton.
     * @param {HumanColorName} color The color of the highlight button and the
     * color to switch the default theme to.
     *
     * @memberOf HighlightColorButton
     */
    constructor(color: HumanColorName) {
        super(new IonIcon('ellipse').font('xxl').foreground(HColor(color)));
        this.id(`highlight-${color}`)
            .addClass('highlight-radio')
            .padding(0)
            .whenClicked(ev => highlightColorSelected(ev, color));
    }
}

/**
 * The component containing all of the subviews for selecting a new highlight
 * color.
 *
 * @export
 * @class HighlightColorPreferences
 * @extends {VStack}
 */
export class HighlightColorPreferences extends VStack {
    /**
     * Creates an instance of HighlightColorPreferences.
     *
     * @memberOf HighlightColorPreferences
     */
    constructor() {
        super(
            new HStack(
                new TextView('Highlight Color')
                    .font('md')
                    .bold()
                    .margin({ bottom: 10 }),
                new Spacer(),
            ).width('100%'),

            new HStack(
                ...(
                    [
                        'blue',
                        'brown',
                        'cyan',
                        'green',
                        'indigo',
                        'mint',
                        'orange',
                        'pink',
                        'purple',
                        'red',
                        'teal',
                        'yellow',
                    ] as HumanColorName[]
                ).map(color => new HighlightColorButton(color)),
                new Spacer(),
            ).width('100%'),
        );
        this.width('100%').padding();
    }
}
