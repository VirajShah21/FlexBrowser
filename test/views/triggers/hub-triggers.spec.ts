import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import { ViewController } from '@Hi/ViewController';
import { getAppController, reloadAppController } from '@UI/FlexBrowserApp';
import FlexBookmarksViewer from '@UI/FlexHub/FlexBookmarksViewer';
import FlexPreferences from '@UI/FlexHub/FlexPreferences';
import FlexWindowsViewer from '@UI/FlexHub/FlexWindowsViewer';
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
        controller.navigateTo(new FlexWindowsViewer());
        expect(controller.activeView.constructor.name).to.equal(
            'FlexHubWindowsViewer',
        );
        const button = controller.findViewById('back-btn');
        (button.body as unknown as HTMLElementMock).mockClick();
        expect(controller.activeView.constructor.name).to.equal('FlexHub');
    });

    it('Should navigate the controller back from the Bookmarks Viewer', () => {
        controller.navigateTo(new FlexBookmarksViewer());
        expect(controller.activeView.constructor.name).to.equal(
            'FlexBookmarksViewer',
        );
        const button = controller.findViewById('back-btn');
        (button.body as unknown as HTMLElementMock).mockClick();
        expect(controller.activeView.constructor.name).to.equal('hub');
    });

    it('Should navigate the controller back from the Preferences Viewer', () => {
        controller.navigateTo(new FlexPreferences());
        expect(controller.activeView.constructor.name).to.equal(
            'FlexPreferences',
        );
        const button = controller.findViewById('back-btn');
        (button.body as unknown as HTMLElementMock).mockClick();
        expect(controller.activeView.constructor.name).to.equal('FlexHub');
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
