import BrowserFrameEdit from '@Components/hub/BrowserFrameEdit';
import BaseHubWindow from './BaseHubWindow';

export default class BrowserFramePreferences extends BaseHubWindow {
    constructor() {
        super('Browser Frame Preferences', new BrowserFrameEdit());
    }
}
