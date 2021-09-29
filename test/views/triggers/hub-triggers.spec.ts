import { ViewController } from '@Hi/ViewController';
import { getAppController, reloadAppController } from '@UI/FlexBrowserApp';
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
        const button = windowsScreen.getViewById('back-btn');
        (button.body as unknown as HTMLElementMock).mockClick();
        expect(controller.visibleScreen).to.equal('hub');
    });

    it('Should navigate the controller back from the Bookmarks Viewer', () => {
        controller.navigateTo('bookmarks');
        expect(controller.visibleScreen).to.equal('bookmarks');
        const windowsScreen = controller.screens.bookmarks;
        const button = windowsScreen.getViewById('back-btn');
        (button.body as unknown as HTMLElementMock).mockClick();
        expect(controller.visibleScreen).to.equal('hub');
    });

    it('Should navigate the controller back from the Preferences Viewer', () => {
        controller.navigateTo('preferences');
        expect(controller.visibleScreen).to.equal('preferences');
        const windowsScreen = controller.screens.preferences;
        const button = windowsScreen.getViewById('back-btn');
        (button.body as unknown as HTMLElementMock).mockClick();
        expect(controller.visibleScreen).to.equal('hub');
    });
});
