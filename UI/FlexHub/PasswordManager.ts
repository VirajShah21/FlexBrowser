import ThemedButton from '@Components/ThemedButton';
import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import addPassword from '@Triggers/PasswordManagerTriggers';
import BaseHubWindow from './BaseHubWindow';

export default class PasswordManager extends BaseHubWindow {
    constructor() {
        super(
            'Password Manager',
            new VStack(
                new HStack(
                    new ThemedButton(new IonIcon('add-circle'))
                        .font('xxl')
                        .whenClicked(addPassword)
                        .padding(0),
                    new Spacer(),
                )
                    .width('100%')
                    .margin({ bottom: 10 }),

                new ScrollView(new VStack().id('passwords-list')).stretch(),
            ).stretch(),
        );

        this.fillPasswordList();
    }

    public static async getAccounts(): Promise<
        { account: string; password: string }[]
    > {
        return flexarch.getAccounts();
    }

    public fillPasswordList(): void {
        PasswordManager.getAccounts().then(accounts => {
            this.findViewById('passwords-list')!
                .removeAllChildren()
                .addChildren(
                    ...accounts.map(account =>
                        new HStack(
                            new TextView(account.account).weight(
                                FontWeight.Medium,
                            ),
                            new Spacer(),
                        )
                            .width('100%')
                            .background(HColor('background'))
                            .padding(5)
                            .margin({ bottom: 5 })
                            .rounded(5),
                    ),
                );
        });
    }
}
