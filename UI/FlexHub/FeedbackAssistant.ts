import ThemedButton from '@Components/TaskbarButtons/ThemedButton';
import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import BaseHubWindow from './BaseHubWindow';
import BugReportFeatureSelection from './BugReportFeatureSelection';
import FeedbackTypeSelection from './FeedbackTypeSelection';

export default class FeedbackAssistant extends BaseHubWindow {
    private currentStep = 0;

    private feedbackType?: string;

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
            switch (this.currentStep) {
                case 0:
                    this.assistantController.navigateTo(
                        new FeedbackTypeSelection(),
                    );
                    break;
                case 1:
                    this.assistantController.navigateTo(
                        new BugReportFeatureSelection(),
                    );
                    break;
                default:
                    this.assistantController.navigateTo(
                        new TextView('An error occured')
                            .foreground(HColor('gray'))
                            .weight(FontWeight.Regular)
                            .font('lg'),
                    );
            }
        }
    }
}
