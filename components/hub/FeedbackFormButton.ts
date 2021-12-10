import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import HumanEvent from '@Hi/Types/HumanEvent';
import BrowserPreferences from '@Models/BrowserPreferences';

type FeedbackGroups = Record<FeedbackFormButtonGroupId, FeedbackFormButton[]>;
type FeedbackFormButtonGroupId = string;

export default class FeedbackFormButton extends ClickButton {
    private static readonly instances: FeedbackGroups = {};

    public active = false;

    private groupId: FeedbackFormButtonGroupId;

    constructor(
        title: string,
        description: string,
        groupId: FeedbackFormButtonGroupId,
    ) {
        super(
            new VStack(
                FeedbackFormButton.formButtonTitle(title),
                FeedbackFormButton.formButtonDescription(description),
            )
                .stretch()
                .alignStart(),
        );

        this.rounded()
            .padding()
            .margin({ bottom: 10 })
            .width('100%')
            .whenMouseOver(FeedbackFormButton.hoverButton)
            .whenMouseOut(FeedbackFormButton.unhoverButton)
            .whenClicked(FeedbackFormButton.buttonClicked)
            .border({ size: 1, style: 'solid' });

        this.defaultStyle();
        this.groupId = groupId;

        if (FeedbackFormButton.instances[groupId]) {
            FeedbackFormButton.instances[groupId]!.push(this);
        } else {
            FeedbackFormButton.instances[groupId] = [this];
        }
    }

    public defaultStyle(): void {
        if (this.active) {
            this.border({
                color: HColor(BrowserPreferences.ColorTheme),
            }).background(HColor('gray4'));
        } else {
            this.border({
                color: HColor('gray5'),
            }).background('none');
        }
    }

    static hoverButton(ev: HumanEvent<FeedbackFormButton>): void {
        ev.view.background(HColor('gray5')).border({ color: HColor('gray4') });
    }

    static unhoverButton(ev: HumanEvent<FeedbackFormButton>): void {
        ev.view.defaultStyle();
    }

    static buttonClicked(ev: HumanEvent<FeedbackFormButton>): void {
        const btn = ev.view;

        FeedbackFormButton.instances[btn.groupId]?.forEach(otherButton => {
            // eslint-disable-next-line no-param-reassign
            otherButton.active = false;
            otherButton.defaultStyle();
        });

        btn.active = true;
        btn.defaultStyle();
    }

    static formButtonTitle(title: string): TextView {
        return new TextView(title)
            .textStart()
            .bold()
            .font('md')
            .foreground(HColor('foreground'))
            .width('100%')
            .margin({ bottom: 5 });
    }

    static formButtonDescription(description: string): TextView {
        return new TextView(description)
            .textStart()
            .font('sm')
            .foreground(HColor('gray'))
            .width('100%');
    }
}
