import { HumanColorName } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import HighlightColorButton from './HighlightColorButton';

/**
 * The component containing all of the subviews for selecting a new highlight
 * color.
 *
 * @export
 * @class HighlightColorPreferences
 * @extends {VStack}
 */
export default class HighlightColorPreferences extends VStack {
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
