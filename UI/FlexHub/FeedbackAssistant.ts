import FeedbackFormButton from '@Components/hub/FeedbackFormButton';
import ThemedButton from '@Components/TaskbarButtons/ThemedButton';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import View from '@Hi/View';
import { ViewController } from '@Hi/ViewController';
import FeedbackMenu from '@Resources/strings/FeedbackMenu.json';
import BaseHubWindow from './BaseHubWindow';
import BugReportDescription from './BugReportDescription';
import BugReportFeatureSelection from './BugReportFeatureSelection';
import FeedbackTypeSelection from './FeedbackTypeSelection';

export default class FeedbackAssistant extends BaseHubWindow {
    private currentStep = 0;

    private assistantController: ViewController;

    constructor() {
        super(
            'Feedback Assistant',

            new VStack().width('100%').id('feedback-assistant-controller'),

            new HStack(
                new ThemedButton(
                    new IonIcon('caret-back-circle-outline').font('xl'),
                )
                    .id('feedback-back-button')
                    .whenClicked(() => this.back()),

                new ThemedButton(
                    new IonIcon('caret-forward-circle-outline').font('xl'),
                )
                    .id('feedback-next-button')
                    .whenClicked(() => this.next()),
            )
                .stretch()
                .padding(),
        );

        const controllerElement = this.findViewById(
            'feedback-assistant-controller',
        )?.body;

        if (controllerElement) {
            this.assistantController = new ViewController(
                'FeedbackAssistantController',
            )
                .bind(controllerElement)
                .navigateTo(new FeedbackTypeSelection());
        }

        this.hideBackButton();
    }

    private hideBackButton(): void {
        this.findViewById<ClickButton>('feedback-back-button')
            ?.disable()
            .opacity(0.5);
    }

    private hideNextButton(): void {
        this.findViewById<ClickButton>('feedback-next-button')
            ?.disable()
            .opacity(0.5);
    }

    private showBackButton(): void {
        this.findViewById<ClickButton>('feedback-back-button')
            ?.enable()
            .opacity(1);
    }

    private showNextButton(): void {
        this.findViewById<ClickButton>('feedback-next-button')
            ?.enable()
            .opacity(1);
    }

    private back(): void {
        this.currentStep -= 1;
        if (this.assistantController) {
            this.assistantController.navigateBack();
        }
        this.showNextButton();
    }

    private next(): void {
        this.currentStep += 1;
        if (this.assistantController) {
            let destination: View<HTMLDivElement> | TextView | undefined;

            this.showBackButton();

            switch (this.currentStep) {
                case 0:
                    destination = new FeedbackTypeSelection();
                    this.hideBackButton();
                    break;
                case 1:
                    if (FeedbackAssistant.feedbackType === 0) {
                        destination = new BugReportFeatureSelection();
                    }
                    break;
                case 2:
                    if (
                        FeedbackAssistant.feedbackType === 0 &&
                        FeedbackAssistant.bugReportFeature !== undefined
                    ) {
                        destination = new BugReportDescription();
                        this.hideNextButton();
                    }
                    break;
                default:
                    destination = new TextView('An error occured.')
                        .foreground(HColor('gray'))
                        .weight(FontWeight.Regular)
                        .font('lg')
                        .padding();
                    this.hideNextButton();
            }

            if (!destination) {
                destination = new TextView('An error occured.')
                    .foreground(HColor('gray'))
                    .weight(FontWeight.Regular)
                    .font('lg')
                    .padding();
                this.hideNextButton();
            }

            this.assistantController.navigateTo(destination);
        }
    }

    public static get feedbackType(): number | undefined {
        return FeedbackFormButton.getActiveButtonIndex(
            FeedbackMenu.feedbackType.id,
        );
    }

    public static get bugReportFeature(): number | undefined {
        return FeedbackFormButton.getActiveButtonIndex(
            FeedbackMenu.bugReportFeature.id,
        );
    }
}
