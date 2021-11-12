import ThemedButton from '@Components/ThemedButton';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import Overlay from '@Hi/Components/Overlay';
import PasswordField from '@Hi/Components/PasswordField';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
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
                        .foreground(HColor('background'))
                        .whenClicked(() => {
                            const overlay = new Overlay(
                                new VStack(
                                    new Spacer(),
                                    new HStack(
                                        new TextView('Account').weight(
                                            FontWeight.Bold,
                                        ),
                                        new Spacer(),
                                        new TextField(
                                            'google.com (example@gmail.com)',
                                        ).width('65%'),
                                    )
                                        .width('100%')
                                        .margin({ bottom: 50 }),

                                    new HStack(
                                        new TextView('Password').weight(
                                            FontWeight.Bold,
                                        ),
                                        new Spacer(),
                                        new PasswordField().width('65%'),
                                    )
                                        .width('100%')
                                        .margin({ bottom: 50 }),

                                    new ThemedButton(new TextView('Add')),

                                    new Spacer(),
                                )
                                    .id('add-account-menu')
                                    .stretch()
                                    .padding(),
                            );
                        }),
                ).width('100%'),

                new ScrollView(new VStack().id('passwords-list')).stretch(),
            ).stretch(),
        );
    }
}
