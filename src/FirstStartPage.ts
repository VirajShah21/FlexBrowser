import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';

function MainIntro() {
    return new VStack(
        new TextView('This is your entire browser window')
            .font('xxl')
            .weight(FontWeight.Light),
        new HStack(
            new IonIcon('chevron-back-circle-outline'),
            new IonIcon('chevron-forward-circle-outline'),

            new TextField(),

            new IonIcon('refresh-circle-outline'),
            new IonIcon('add-circle-outline'),
        ),
    );
}

export default class FirstStartPage extends HIFullScreenView {
    private controller: ViewController;

    constructor() {
        super(
            new VStack(
                new VStack().id('viewer'),
                new Spacer(),
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
