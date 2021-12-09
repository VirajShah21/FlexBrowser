import ThemedButton from '@Components/TaskbarButtons/ThemedButton';
import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { defineTransition } from '@Hi/Transitions/Transition';

export default class PasswordListItem extends VStack {
    private static editModeEnabledTransition = defineTransition({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
        iterations: 1,
        duration: 1,
        after: 'forwards',
    });

    private static editModeDisabledTransition = defineTransition({
        from: {
            opacity: 1,
        },
        to: {
            opacity: 0,
        },
        iterations: 1,
        duration: 1,
        after: 'forwards',
    });

    private account: string;

    public constructor(account: { account: string; password: string }) {
        super(
            new HStack(
                new ThemedButton(new IonIcon('eye-outline'))
                    .font('lg')
                    .whenClicked(() => this.showPassword()),
                new TextView(account.account).font('md'),
                new Spacer(),
                new ThemedButton(new IonIcon('create-outline'))
                    .id('password-edit-button')
                    .opacity(0)
                    .font('lg'),
                new ThemedButton(new IonIcon('remove-circle-outline'))
                    .foreground(HColor('red'))
                    .id('remove-password-button')
                    .opacity(0)
                    .font('lg'),
            ).width('100%'),

            new VStack().addClass('account-info').width('100%'),
        );

        this.width('100%')
            .background(HColor('background'))
            .border({ size: 1, style: 'solid', color: HColor('gray5') })
            .padding({ top: 5, bottom: 5 })
            .margin({ bottom: 5 })
            .rounded(50)
            .addClass('PasswordListItem');

        this.account = account.account;
    }

    public enableEditMode(): void {
        const editButton = this.findViewById('password-edit-button')!;
        const removeButton = this.findViewById('remove-password-button')!;

        editButton.transition(PasswordListItem.editModeEnabledTransition);
        removeButton.transition(PasswordListItem.editModeEnabledTransition);
    }

    public disableEditMode(): void {
        const editButton = this.findViewById('password-edit-button')!;
        const removeButton = this.findViewById('remove-password-button')!;

        editButton.transition(PasswordListItem.editModeDisabledTransition);
        removeButton.transition(PasswordListItem.editModeDisabledTransition);
    }

    public showPassword(): void {
        flexarch.getPassword(this.account).then(password => {
            const accountInfo = this.getViewsByClass('account-info')[0];
            accountInfo
                ?.removeAllChildren()
                .addChildren(
                    new HStack(
                        new TextView('Details')
                            .bold()
                            .foreground(HColor('gray')),
                        new Spacer(),
                    ).width('100%'),
                    new HStack(
                        new TextView('Account: ').bold(),
                        new TextView(this.account).margin({ left: 10 }),
                        new Spacer(),
                    ).width('100%'),
                    new HStack(
                        new TextView('Password: ').bold(),
                        new TextView(password ?? 'No password provided').margin(
                            { left: 10 },
                        ),
                        new Spacer(),
                    ).width('100%'),
                )
                .padding();
        });
        this.rounded();
    }
}
