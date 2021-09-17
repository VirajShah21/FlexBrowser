import { HumanColorName } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import HighlightColorButton from './HighlightColorButton';

export default class HighlightColorPreferences extends VStack {
    constructor() {
        super(
            new HStack(
                new TextView('Highlight Color')
                    .font('md')
                    .bold()
                    .margin({ bottom: 10 }),
                new Spacer(),
            ).stretchWidth(),

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
            ).stretchWidth(),
        );
        this.stretchWidth().padding();
    }
}
