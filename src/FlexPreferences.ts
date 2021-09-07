import { HColor, HumanColorName } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ImageView from '@Hi/Components/ImageView';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from './BrowserPreferences';

export default class FlexPreferences extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new VStack(
                    new Spacer(),
                    new HStack(
                        new ClickButton(new TextView('Back'))
                            .padding(0)
                            .whenClicked(() => {
                                ViewController.getController(
                                    'AppController'
                                )!.navigateTo('hub');
                            }),
                        new Spacer()
                    ).stretchWidth(),
                    new HStack(
                        new TextView('Preferences').font('xxl').bold(),
                        new Spacer()
                    ).stretchWidth()
                )
                    .padding()
                    .stretchWidth()
                    .height(100)
                    .background(HColor('gray6')),

                new VStack(
                    new HStack(
                        new TextView('Highlight Color')
                            .font('md')
                            .bold()
                            .margin({ bottom: 10 }),
                        new Spacer()
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
                        ).map(color => ColorThemeButton(color)),
                        new Spacer()
                    ).stretchWidth()
                )
                    .stretchWidth()
                    .padding(),

                new VStack(
                    new HStack(
                        new TextView('Theme')
                            .font('md')
                            .bold()
                            .margin({ bottom: 10 }),
                        new Spacer()
                    ).stretchWidth(),

                    new HStack(
                        new VStack(
                            new ClickButton(
                                new ImageView(
                                    'assets/LightThemeThumb.png'
                                ).rounded()
                            )
                                .padding(0)
                                .border({
                                    size: 1,
                                    style: 'solid',
                                    color: HColor('gray3'),
                                })
                                .rounded(),
                            new TextView('Light Mode')
                                .margin({ top: 5 })
                                .font('sm')
                        ).rounded(),

                        new Spacer(),

                        new VStack(
                            new ClickButton(
                                new ImageView(
                                    'assets/DarkThemeThumb.png'
                                ).rounded()
                            )
                                .padding(0)
                                .border({
                                    size: 1,
                                    style: 'solid',
                                    color: HColor('gray3'),
                                })
                                .rounded(),
                            new TextView('Dark Mode')
                                .margin({ top: 5 })
                                .font('sm')
                        ).rounded(),

                        new Spacer()
                    ).stretchWidth()
                )
                    .stretchWidth()
                    .padding(),

                new HStack(new HStack()),

                new Spacer()
            ).stretch()
        );
    }
}

function ColorThemeButton(color: HumanColorName): ClickButton {
    return new ClickButton(
        new IonIcon('ellipse').font('xxl').foreground(HColor(color))
    )
        .padding(0)
        .whenClicked(() => {
            BrowserPreferences.setColorTheme(color);
            window.location.reload();
        });
}
