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
        const windowsScreen = controller.screens[controller.visibleScreen];
        const button = windowsScreen.getViewById('back-btn');
        (button.body as unknown as HTMLElementMock).mockClick();
        expect(controller.visibleScreen).to.equal('hub');
    });

    // it('Should navigate the controller back from the Bookmarks Viewer', () => {
    //     controller.navigateTo('windows');
    //     const windowsScreen = controller.screens[controller.visibleScreen];
    //     const button = windowsScreen.getViewById('back-btn');
    //     (button.body as unknown as HTMLElementMock).mockClick();
    //     expect(controller.visibleScreen).to.equal('hub');
    // });
});
