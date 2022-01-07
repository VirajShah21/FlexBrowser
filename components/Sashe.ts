import Spacer from '@Hi/Components/Spacer';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import RGBAModel from '@Hi/RGBAModel';

export default class Sashe extends VStack {
    constructor() {
        super(
            new TextView('Flex Browser 1.0.0')
                .weight(FontWeight.UltraLight)
                .font(50)
                .margin({ left: 25 }),
            new TextView('Affenpinscher – Stable Release')
                .weight(FontWeight.UltraLight)
                .font(29)
                .margin({ left: 25 }),
            new Spacer(),

            new VStack().id('error'),

            new Spacer(),
        );

        this.body.style.backgroundImage =
            'linear-gradient(45deg, #4776E6, #8E54E9)';
        this.body.style.transform = 'skewY(-11deg)';

        this.foreground(RGBAModel.WHITE)
            .width('100%')
            .height({ min: 250 })
            .alignStart();
    }
}
