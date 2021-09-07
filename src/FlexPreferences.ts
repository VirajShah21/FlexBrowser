import { HColor, HumanColorName } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import BrowserPreferences from './BrowserPreferences';

export default class FlexPreferences extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new VStack(
                    new Spacer(),
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
                        new TextView('Color Theme')
                            .font('md')
                            .bold()
                            .foreground(HColor('gray4'))
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
                        new TextView('Color Theme')
                            .font('md')
                            .bold()
                            .foreground(HColor('gray4'))
                            .margin({ bottom: 10 }),
                        new Spacer()
                    ),

                    new HStack()
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
