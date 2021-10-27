import { HColor, changeTheme } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import ImageView from '@Hi/Components/ImageView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import Resources from 'Client/Resources';

/**
 * Allows the user to select either a dark theme or light theme. This will
 * be rendered as a part of the main preferences page in the hub window.
 *
 * @export
 * @class ThemePreferences
 * @extends {VStack}
 */
export default class ThemePreferences extends VStack {
    constructor() {
        super(
            new HStack(
                new TextView('Theme').font('md').bold().margin({ bottom: 10 }),
                new Spacer(),
            ).width('100%'),

            new HStack(
                new VStack(
                    new ClickButton(
                        Resources.getImageView('LightThemeThumb.png').rounded(),
                    )
                        .padding(0)
                        .border({
                            size: 1,
                            style: 'solid',
                            color: HColor('gray3'),
                        })
                        .rounded()
                        .whenClicked(() => {
                            changeTheme('light');
                            flexarch.pref('theme', 'light');
                        }),
                    new TextView('Light Mode').margin({ top: 5 }).font('sm'),
                ).rounded(),

                new Spacer(),

                new VStack(
                    new ClickButton(
                        Resources.getImageView('DarkThemeThumb.png').rounded(),
                    )
                        .padding(0)
                        .border({
                            size: 1,
                            style: 'solid',
                            color: HColor('gray3'),
                        })
                        .rounded()
                        .whenClicked(() => {
                            changeTheme('dark');
                            flexarch.pref('theme', 'dark');
                        }),
                    new TextView('Dark Mode').margin({ top: 5 }).font('sm'),
                ).rounded(),

                new Spacer(),
            ).width('100%'),
        );
        this.width('100%').padding();
    }
}
