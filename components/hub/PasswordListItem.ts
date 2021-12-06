import ThemedButton from '@Components/ThemedButton';
import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import { defineTransition } from '@Hi/Transitions/Transition';
import HumanEvent from '@Hi/Types/HumanEvent';

export default class PasswordListItem extends HStack {
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

    public constructor(account: { account: string; password: string }) {
        super(
            new ThemedButton(new IonIcon('ellipse-outline'))
                .font('lg')
                .whenClicked(PasswordListItem.showPassword),
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
        );

        this.width('100%')
            .background(HColor('background'))
            .border({ size: 1, style: 'solid', color: HColor('gray5') })
            .padding({ top: 5, bottom: 5 })
            .margin({ bottom: 5 })
            .rounded(50)
            .addClass('PasswordListItem');
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

    public static showPassword(ev: HumanEvent<ThemedButton>): void {
        ev.view
            .removeAllChildren()
            .addChildren(new IonIcon('checkmark-circle'));
    }
}
