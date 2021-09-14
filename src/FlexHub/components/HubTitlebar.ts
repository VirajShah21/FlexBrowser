import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import View from '@Hi/View';

export default class HubTitlebar extends VStack {
    constructor(title: string, ...children: View[]) {
        super(
            new Spacer(),
            new HStack(...children).stretchWidth().margin({ top: 20 }),

            new HStack(
                new TextView(title).font('xxl').bold(),
                new Spacer()
            ).stretchWidth()
        );
        this.padding()
            .stretchWidth()
            .height(100)
            .background(HColor('background').alpha(0.25))
            .foreground(HColor('foreground'));

        this.body.style.setProperty('-webkit-app-region', 'drag');
    }
}
