import ThemedButton from '@Components/ThemedButton';
import HStack from '@Hi/Components/HStack';
import InputField from '@Hi/Components/InputField';
import Overlay from '@Hi/Components/Overlay';
import PasswordField from '@Hi/Components/PasswordField';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import HumanEvent from '@Hi/Types/HumanEvent';

export function addPassword(ev: HumanEvent): void {
    const overlay = new Overlay(
        new VStack(
            new Spacer(),
            new HStack(
                new TextView('Account').weight(FontWeight.Bold),
                new Spacer(),
                new TextField('google.com (example@gmail.com)')
                    .width('65%')
                    .id('keychain-account'),
            )
                .width('100%')
                .margin({ bottom: 50 }),

            new HStack(
                new TextView('Password').weight(FontWeight.Bold),
                new Spacer(),
                new PasswordField().width('65%').id('keychain-password'),
            )
                .width('100%')
                .margin({ bottom: 50 }),

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

            new Spacer(),
        )
            .id('add-account-menu')
            .stretch()
            .padding(),
    );
}
