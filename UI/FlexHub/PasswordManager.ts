import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import BrowserPreferences from '@Models/BrowserPreferences';
import BaseHubWindow from './BaseHubWindow';

export default class PasswordManager extends BaseHubWindow {
    constructor() {
        super(
            'Password Manager',
            new VStack(
                new HStack(
                    new Spacer(),
                    new ClickButton(new TextView('+').weight(FontWeight.Bold))
                        .background(HColor(BrowserPreferences.colorTheme))
                        .foreground(HColor('background')),
                ).width('100%'),

                new ScrollView(new VStack().id('passwords-list')).stretch(),
            ).stretch(),
        );
    }
}
