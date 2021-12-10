import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import HumanEvent from '@Hi/Types/HumanEvent';
import BrowserPreferences from '@Models/BrowserPreferences';
import BaseHubWindow from './BaseHubWindow';

class FeedbackFormButton extends ClickButton {
    public active = false;

    constructor(title: string, description: string) {
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

export default class FeedbackAssistant extends BaseHubWindow {
    constructor() {
        super(
            'Feedback Assistant',

            new VStack(
                new ScrollView(
                    new FeedbackFormButton(
                        'Bug Report',
                        'This will submit a log report, along with any additional information you provide.',
                    ),
                    new FeedbackFormButton(
                        'Feature Request',
                        'If you have an idea which you believe would make a great addition to Flex Browser, let us know.',
                    ),
                    new FeedbackFormButton(
                        'Comments',
                        "If you have any comments or suggestions, please inform us. This could be a feature you don't like, or one you enjoy.",
                    ),
                    new FeedbackFormButton(
                        'Help',
                        'Get assistance with using the browser. Learn a little bit more about Flex Browser, how it works, and more.',
                    ),

                    new Spacer(),
                ).stretch(),
            ).stretch(),
        );
    }
}
