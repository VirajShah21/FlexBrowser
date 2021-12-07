import PasswordListItem from '@Components/hub/PasswordListItem';
import ThemedButton from '@Components/ThemedButton';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import Overlay from '@Hi/Components/Overlay';
import PasswordField from '@Hi/Components/PasswordField';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import HumanEvent from '@Hi/Types/HumanEvent';
import BaseHubWindow from './BaseHubWindow';

export default class PasswordManager extends BaseHubWindow {
    constructor() {
        super(
            'Password Manager',
            new VStack(
                new HStack(
                    new ThemedButton(new IonIcon('add-circle'))
                        .font('xxl')
                        .whenClicked(PasswordManager.addPassword)
                        .padding(0),
                    new TextField('Search')
                        .width('100%')
                        .rounded(50)
                        .background(HColor('background').alpha(0.5))
                        .whenFocused(ev =>
                            ev.view.background(HColor('background')),
                        )
                        .whenUnfocused(ev =>
                            ev.view.background(HColor('background').alpha(0.5)),
                        )
                        .padding({ left: 10, right: 10 }),
                    new ThemedButton(new TextView('Edit'))
                        .whenClicked(PasswordManager.enableEditMode)
                        .id('edit-mode-button'),
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
                    ...accounts.map(account => new PasswordListItem(account)),
                );
        });
    }

    public static enableEditMode(ev: HumanEvent<ThemedButton>): void {
        const button = ev.view;

        // If we are already in edit mode
        if (button.identifier === 'exit-edit-mode-button') {
            button
                .removeAllChildren()
                .addChildren(new TextView('Edit'))
                .id('edit-mode-button');
            ev.view
                .root()
                .getViewsByClass('PasswordListItem')
                .forEach(item => (item as PasswordListItem).disableEditMode());
        } else {
            // If we are not in edit mode
            button
                .removeAllChildren()
                .addChildren(new TextView('Done').foreground(HColor('red')))
                .id('exit-edit-mode-button');
            ev.view
                .root()
                .getViewsByClass('PasswordListItem')
                .forEach(item => (item as PasswordListItem).enableEditMode());
        }
    }

    private static addPassword(): void {
        const overlay = new Overlay(
            new VStack(
                new Spacer(),

                new HStack(
                    new TextView('Domain / Service').weight(FontWeight.Bold),
                    new Spacer(),
                ).width('100%'),
                new TextField('Ex: accounts.google.com')
                    .width('100%')
                    .id('keychain-service'),

                new HStack(
                    new TextView('Account').weight(FontWeight.Bold),
                    new Spacer(),
                )
                    .width('100%')
                    .margin({ top: 10 }),
                new TextField('Ex: example@gmail.com')
                    .width('100%')
                    .id('keychain-account'),

                new HStack(
                    new TextView('Password').weight(FontWeight.Bold),
                    new Spacer(),
                )
                    .width('100%')
                    .margin({ top: 10 }),
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

                new HStack(
                    new ThemedButton(new TextView('Cancel'))
                        .foreground(HColor('red'))
                        .whenClicked(ev => ev.view.root().destroy()),
                    new ThemedButton(new TextView('Add')).whenClicked(ev => {
                        const root = ev.view.root();
                        const service = (
                            root.findViewById('keychain-service') as InputField
                        ).value;
                        const account = (
                            root.findViewById('keychain-account') as InputField
                        ).value;
                        const password = (
                            root.findViewById('keychain-password') as InputField
                        ).value;
                        flexarch.setPassword(
                            `${service} (${account})`,
                            password,
                        );
                        overlay.destroy();
                    }),
                ).margin({ top: 10 }),

                new Spacer(),
            )
                .id('add-account-menu')
                .stretch()
                .padding(),
        ).background(HColor('background'));
    }
}
