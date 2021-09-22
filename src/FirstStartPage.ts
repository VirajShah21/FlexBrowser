import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';

function MainIntro() {
    return new VStack(
        new Spacer(),
        new TextView('Welcome to your new Web Browser')
            .font('xxl')
            .weight(FontWeight.UltraLight)
            .margin({ bottom: 25 }),
        new TextView('Click "Next" to continue with the setup').weight(
            FontWeight.Light,
        ),
        new Spacer(),
    );
}

export default class FirstStartPage extends HIFullScreenView {
    private controller: ViewController;

    constructor() {
        super(
            new VStack(
                new VStack().id('viewer').grow(),

                new HStack(
                    new ClickButton(new TextView('Back')),
                    new Spacer(),
                    new ClickButton(new TextView('Next')),
                )
                    .width('100%')
                    .padding()
                    .background(HColor('gray').alpha(0.2)),
            )
                .background(HColor('background').alpha(0.75))
                .foreground(HColor('foreground'))
                .stretch(),
        );

        this.body.style.setProperty('-webkit-app-region', 'drag');

        new ViewController({
            main: MainIntro(),
        })
            .mapTo('FirstStartPageController')
            .bind(this.getViewById('viewer')!.body)
            .navigateTo();
    }
}
