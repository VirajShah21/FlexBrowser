import ThemedButton from '@Components/ThemedButton';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import Overlay from '@Hi/Components/Overlay';
import PasswordField from '@Hi/Components/PasswordField';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';

export default function addPassword(): void {
    const overlay = new Overlay(
        new VStack(
            new Spacer(),
            new VStack(
                new HStack(
                    new TextView('Account').weight(FontWeight.Bold),
                    new Spacer(),
                ).width('100%'),
                new TextField('google.com (example@gmail.com)')
                    .width('100%')
                    .id('keychain-account'),
            )
                .width('100%')
                .margin({ bottom: 50 }),

            new VStack(
                new HStack(
                    new TextView('Password').weight(FontWeight.Bold),
                    new Spacer(),
                ).width('100%'),
                new HStack(
                    new PasswordField().width('100%').id('keychain-password'),
                    new ClickButton(
                        new IonIcon('eye-off-outline').id('show-password-icon'),
                    )
                        .font('lg')
                        .id('show-password-btn')
                        .whenClicked(ev => {
                            const root = ev.view.root();
                            const passwordField = root.findViewById(
                                'keychain-password',
                            ) as PasswordField;
                            const eyeIcon = root.findViewById(
                                'show-password-icon',
                            ) as IonIcon;

                            if (
                                passwordField.body.getAttribute('type') ===
                                'password'
                            ) {
                                passwordField.body.setAttribute('type', 'text');
                                eyeIcon.name = 'eye-outline';
                            } else {
                                passwordField.body.setAttribute(
                                    'type',
                                    'password',
                                );
                                eyeIcon.name = 'eye-off-outline';
                            }
                        }),
                ).width('100%'),
            )
                .width('100%')
                .margin({ bottom: 50 }),

            new HStack(
                new ThemedButton(new TextView('Cancel'))
                    .foreground(HColor('red'))
                    .whenClicked(ev => ev.view.root().destroy()),
                new ThemedButton(new TextView('Add')).whenClicked(ev => {
                    const root = ev.view.root();
                    const account = (
                        root.findViewById('keychain-account') as InputField
                    ).value;
                    const password = (
                        root.findViewById('keychain-password') as InputField
                    ).value;
                    flexarch.setPassword(account, password);
                    overlay.destroy();
                }),
            ),

            new Spacer(),
        )
            .id('add-account-menu')
            .stretch()
            .padding(),
    ).background(HColor('background'));
}
