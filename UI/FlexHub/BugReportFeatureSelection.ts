import FeedbackFormButton from '@Components/hub/FeedbackFormButton';
import VStack from '@Hi/Components/VStack';
import FeedbackMenu from '@Resources/strings/FeedbackMenu.json';

export default class BugReportFeatureSelection extends VStack {
    constructor() {
        super(
            ...FeedbackMenu.bugReportFeature.items.map(
                item =>
                    new FeedbackFormButton(
                        item.title,
                        item.description,
                        FeedbackMenu.bugReportFeature.id,
                    ),
            ),
        );
    }
}
