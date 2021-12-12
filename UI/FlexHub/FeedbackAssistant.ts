import FeedbackFormButton from '@Components/hub/FeedbackFormButton';
import ThemedButton from '@Components/TaskbarButtons/ThemedButton';
import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import View from '@Hi/View';
import { ViewController } from '@Hi/ViewController';
import BaseHubWindow from './BaseHubWindow';
import BugReportFeatureSelection from './BugReportFeatureSelection';
import FeedbackTypeSelection from './FeedbackTypeSelection';
import FeedbackMenu from '@Resources/strings/FeedbackMenu.json';

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
                    .id('feedback-back-button')
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
    }

    private back(): void {
        this.currentStep -= 1;
        if (this.assistantController) {
            this.assistantController.navigateBack();
        }
    }

    private next(): void {
        this.currentStep += 1;
        if (this.assistantController) {
            let destination: View<HTMLDivElement> | TextView;

            switch (this.currentStep) {
                case 0:
                    destination = new FeedbackTypeSelection();
                    break;
                case 1:
                    if (FeedbackAssistant.feedbackType === 0) {
                        destination = new BugReportFeatureSelection();
                    } else {
                        destination = new TextView('Error')
                            .foreground(HColor('gray'))
                            .weight(FontWeight.Regular)
                            .font('lg')
                            .padding();
                    }

                    break;
                default:
                    destination = new TextView(
                        'An error occured. ' + this.currentStep,
                    )
                        .foreground(HColor('gray'))
                        .weight(FontWeight.Regular)
                        .font('lg')
                        .padding();
            }

            this.assistantController.navigateTo(destination);
        }
    }

    public static get feedbackType(): number | undefined {
        return FeedbackFormButton.getActiveButtonIndex(
            FeedbackMenu.feedbackType.id,
        );
    }
}
