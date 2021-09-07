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
                new Spacer(),

                new TextView('Preferences').font('xxl').bold(),

                new Spacer(),

                new TextView('Color Theme').font('md').bold().foreground(HColor('gray4')).margin({ bottom: 10 }),

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
                    ).map(color => ColorThemeButton(color))
                ).stretchWidth(),

                new Spacer()
            ).stretch()
        );
    }
}

function ColorThemeButton(color: HumanColorName): ClickButton {
    return new ClickButton(new IonIcon('ellipse').font('xxl').foreground(HColor(color))).whenClicked(() => {
        BrowserPreferences.setColorTheme(color);
        window.location.reload();
    });
}
