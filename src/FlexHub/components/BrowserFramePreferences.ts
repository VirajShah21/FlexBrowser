import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from 'src/BrowserPreferences';

export default class BrowserFramePreferences extends VStack {
    constructor() {
        super(
            new HStack(
                new TextView('Browser Frame')
                    .font('md')
                    .bold()
                    .margin({ bottom: 10 }),
                new Spacer(),
                new ClickButton(new TextView('Edit'))
                    .padding(0)
                    .whenClicked(() =>
                        ViewController.getController(
                            'AppController'
                        )?.navigateTo('frameComposer')
                    )
            ).stretchWidth(),

            BrowserFramePreview()
        );

        this.stretchWidth().padding();
    }
}

function BrowserFramePreview(): VStack {
    return new VStack(
        new HStack(
            new IonIcon('ellipse').foreground(HColor('red')),
            new IonIcon('ellipse').foreground(HColor('orange')),
            new IonIcon('ellipse').foreground(HColor('green')),
            new Spacer()
        ).stretchWidth(),
        new HStack(
            new HStack(
                new IonIcon('chevron-back-circle-outline').font('xl'),
                new IonIcon('chevron-forward-circle-outline').font('xl'),
                new Spacer()
            )
                .width('20%')
                .padding(5),
            new Spacer(),
            new HStack(new TextField('Search or Go to URL').stretchWidth())
                .width('60%')
                .padding(5),
            new Spacer(),
            new HStack(
                new IonIcon('refresh-circle-outline').font('xl'),
                new Spacer(),
                new IonIcon('add-circle-outline').font('xl')
            )
                .width('20%')
                .padding(5)
        ).stretchWidth()
    )
        .background(HColor('gray5'))
        .foreground(BrowserPreferences.getPrimaryColor())
        .stretchWidth()
        .padding(5)
        .rounded()
        .rounded({ bottom: { left: 0, right: 0 } });
}
