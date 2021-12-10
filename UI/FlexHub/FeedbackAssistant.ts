import ThemedButton from '@Components/TaskbarButtons/ThemedButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import BaseHubWindow from './BaseHubWindow';
import FeedbackTypeSelection from './FeedbackTypeSelection';

export default class FeedbackAssistant extends BaseHubWindow {
    constructor() {
        super(
            'Feedback Assistant',

            new VStack().stretch().id('feedback-assistant-controller'),

            new HStack(
                new ThemedButton(
                    new IonIcon('caret-back-circle-outline').font('xl'),
                ),
                new ThemedButton(
                    new IonIcon('caret-forward-circle-outline').font('xl'),
                ),
            ).stretch(),
        );

        const controllerElement = this.findViewById(
            'feedback-assistant-controller',
        )?.body;

        if (controllerElement) {
            new ViewController('FeedbackAssistantController')
                .bind(controllerElement)
                .navigateTo(new FeedbackTypeSelection());
        }
    }
}
