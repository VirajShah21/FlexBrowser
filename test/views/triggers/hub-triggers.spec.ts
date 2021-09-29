import { getAppController, reloadAppController } from '@UI/FlexBrowserApp';
import mockBrowser from '../../mocks/Browser.mock';

mockBrowser();

describe('Hub (Trigger): Navigating to main hub page', () => {
    beforeEach(() => {
        mockBrowser();
        reloadAppController();
    });

    it('Should navigate the controller back from the Windows Viewer', () => {
        getAppController().navigateTo('windows');
    });
});
