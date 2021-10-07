import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import { ViewController } from '@Hi/ViewController';
import { getAppController, reloadAppController } from '@UI/FlexBrowserApp';
import { toggleBookmarkButtonClicked } from '@UI/triggers/hub-triggers';
import { expect } from 'chai';
import mockBrowser from '../../mocks/Browser.mock';
import HTMLElementMock from '../../mocks/HTMLElement.mock';

describe('Hub (Trigger): Navigating to main hub page', () => {
    let controller: ViewController;

    beforeEach(() => {
        mockBrowser();
        reloadAppController();
        controller = getAppController();
    });

    it('Should navigate the controller back from the Windows Viewer', () => {
        controller.navigateTo('windows');
        expect(controller.visibleScreen).to.equal('windows');
        const windowsScreen = controller.screens.windows;
        const button = windowsScreen.findViewById('back-btn');
        (button.body as unknown as HTMLElementMock).mockClick();
        expect(controller.visibleScreen).to.equal('hub');
    });

    it('Should navigate the controller back from the Bookmarks Viewer', () => {
        controller.navigateTo('bookmarks');
        expect(controller.visibleScreen).to.equal('bookmarks');
        const bookmarksViewer = controller.screens.bookmarks;
        const button = bookmarksViewer.findViewById('back-btn');
        (button.body as unknown as HTMLElementMock).mockClick();
        expect(controller.visibleScreen).to.equal('hub');
    });

    it('Should navigate the controller back from the Preferences Viewer', () => {
        controller.navigateTo('preferences');
        expect(controller.visibleScreen).to.equal('preferences');
        const preferencesViewer = controller.screens.preferences;
        const button = preferencesViewer.findViewById('back-btn');
        (button.body as unknown as HTMLElementMock).mockClick();
        expect(controller.visibleScreen).to.equal('hub');
    });
});

describe('Hub (Trigger): Should toggle bookmarks button', () => {
    let btn: ClickButton;

    beforeEach(() => {
        btn = new ClickButton(new IonIcon('bookmark')).whenClicked(ev =>
            toggleBookmarkButtonClicked(ev, {
                title: 'Google',
                url: 'https://google.com/',
            }),
        );
    });

    it('Should toggle between bookmarked and unbookmarks.', () => {
        btn.describe('bookmark');
        (btn.body as unknown as HTMLElementMock).mockClick();
        expect(btn.description).to.equal('unbookmark');
        (btn.body as unknown as HTMLElementMock).mockClick();
        expect(btn.description).to.equal('bookmark');
    });

    it('Should default to not bookmarked state so user can bookmark.', () => {
        (btn.body as unknown as HTMLElementMock).mockClick();
        expect(btn.description).to.equal('unbookmark');
        (btn.body as unknown as HTMLElementMock).mockClick();
        expect(btn.description).to.equal('bookmark');
    });
});
