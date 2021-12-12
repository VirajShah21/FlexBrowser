import FeedbackFormButton from '@Components/hub/FeedbackFormButton';
import VStack from '@Hi/Components/VStack';

export default class BugReportFeatureSelection extends VStack {
    constructor() {
        super(
            new FeedbackFormButton(
                'Browser Taskbar',
                'The browser taskbar is the main browser page, where you can navigate to different websites. Select this if something on the taskbar is not working.',
                'bug-report-feature',
            ),

            new FeedbackFormButton(
                'Hub Main Menu',
                'Select this if the Hub menu is not opening, or you have issues accessing or using the Hub window.',
                'bug-report-feature',
            ),

            new FeedbackFormButton(
                'Windows List',
                'Select this if there is a problem viewing the Windows List in the Hub window.',
                'bug-report-feature',
            ),

            new FeedbackFormButton(
                'Bookmarks',
                'Select this if you are having problems bookmarking a website, issues when accessing the bookmarks list.',
                'bug-report-feature',
            ),

            new FeedbackFormButton(
                'History',
                'Select this if the browser is not correctly tracking your history or you are having issues accessing your browser history.',
                'bug-report-feature',
            ),

            new FeedbackFormButton(
                'Password Manager',
                'Select this if there is an issue with accessing or changing passwords in the builtin password manager.',
                'bug-report-feature',
            ),

            new FeedbackFormButton(
                'Preferences',
                'Select this if there is something wrong with the Preferences views or any of their subviews.',
                'bug-report-feature',
            ),
        );
    }
}
