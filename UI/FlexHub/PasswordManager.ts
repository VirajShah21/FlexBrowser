import ThemedButton from '@Components/ThemedButton';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import InputField from '@Hi/Components/InputField';
import Overlay from '@Hi/Components/Overlay';
import PasswordField from '@Hi/Components/PasswordField';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import BrowserPreferences from '@Models/BrowserPreferences';
import { addPassword } from '@Triggers/PasswordManagerTriggers';
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
                        .whenClicked(addPassword),
                ).width('100%'),

                new ScrollView(new VStack().id('passwords-list')).stretch(),
            ).stretch(),
        );

        // this.fillPasswordList();
    }

    public static get accounts(): string[] {
        return flexarch.getAccounts();
    }

    public static get keychain(): { account: string; password: string }[] {
        const { accounts } = PasswordManager;
        return accounts.map(account => ({
            account,
            password: flexarch.getPassword(account),
        }));
    }

    public fillPasswordList(): void {
        this.findViewById('passwords-list')!
            .removeAllChildren()
            .addChildren(
                ...PasswordManager.keychain.map(
                    keychainObject =>
                        new HStack(
                            new TextView(keychainObject.account),
                            new TextView(keychainObject.password),
                        ),
                ),
            );
    }
}
