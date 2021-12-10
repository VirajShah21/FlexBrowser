import SelectMenu from '@Components/SelectMenu';
import SelectMenuOption from '@Components/SelectMenuOption';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';

export default class BugReporterQuestions extends VStack {
    constructor() {
        super(
            new TextView('What feature is this bug report regarding?'),
            new SelectMenu(
                new SelectMenuOption(
                    'URL Bar or Back/Forward Buttons',
                    'taskbar',
                ),
                new SelectMenuOption('Main Hub Menu', 'hub'),
                new SelectMenuOption('Windows List', 'windows'),
                new SelectMenuOption('Bookmarks List', 'bookmarks'),
                new SelectMenuOption('History', 'history'),
                new SelectMenuOption('Password Manager', 'passwords'),
                new SelectMenuOption('Browser Preferences', 'preferences'),
            ),
        );
    }
}
