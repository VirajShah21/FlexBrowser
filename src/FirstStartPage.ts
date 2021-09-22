import { HColor } from '@Hi/Colors';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';

export default class FirstStartPage extends HIFullScreenView {
    constructor() {
        super(
            new VStack(new TextView('Welcome to Flex Browser').font('lg'))
                .background(HColor('background').alpha(0.75))
                .foreground(HColor('foreground'))
                .stretch(),
        );

        this.body.style.setProperty('-webkit-app-region', 'drag');
    }
}
