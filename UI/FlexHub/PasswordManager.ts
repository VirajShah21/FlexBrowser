import PasswordListItem from '@Components/hub/PasswordListItem';
import ThemedButton from '@Components/ThemedButton';
import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import ScrollView from '@Hi/Components/ScrollView';
import TextField from '@Hi/Components/TextField';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import HumanEvent from '@Hi/Types/HumanEvent';
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
}
