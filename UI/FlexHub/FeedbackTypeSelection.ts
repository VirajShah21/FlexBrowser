import FeedbackFormButton from '@Components/hub/FeedbackFormButton';
import VStack from '@Hi/Components/VStack';

export default class FeedbackTypeSelection extends VStack {
    constructor() {
        super(
            new FeedbackFormButton(
                'Bug Report',
                'This will submit a log report, along with any additional information you provide.',
                'feedback-type',
            ),
            new FeedbackFormButton(
                'Feature Request',
                'If you have an idea which you believe would make a great addition to Flex Browser, let us know.',
                'feedback-type',
            ),
            new FeedbackFormButton(
                'Comments',
                "If you have any comments or suggestions, please inform us. This could be a feature you don't like, or one you enjoy.",
                'feedback-type',
            ),
            new FeedbackFormButton(
                'Help',
                'Get assistance with using the browser. Learn a little bit more about Flex Browser, how it works, and more.',
                'feedback-type',
            ),
        );
    }
}
