import FeedbackFormButton from '@Components/hub/FeedbackFormButton';
import VStack from '@Hi/Components/VStack';
import FeedbackMenu from '@Resources/strings/FeedbackMenu.json';

export default class FeedbackTypeSelection extends VStack {
    constructor() {
        super(
            ...FeedbackMenu.feedbackType.items.map(
                item =>
                    new FeedbackFormButton(
                        item.title,
                        item.description,
                        FeedbackMenu.feedbackType.id,
                    ),
            ),
        );
    }
}
