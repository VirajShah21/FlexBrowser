import IonIcon from '@Hi/Components/IonIcon';
import BrowserPreferences from '@Models/BrowserPreferences';
import TaskbarButton from './TaskbarButton';

export default class LaunchHubTaskbarButton extends TaskbarButton {
    constructor() {
        super();
        this.whenClicked(flexarch.focusHub);
    }

    // eslint-disable-next-line class-methods-use-this
    public resolveIcon(): IonIcon {
        switch (BrowserPreferences.IconTheme.hub) {
            case 'home':
                return new IonIcon('home-outline');
            case 'home-filled':
                return new IonIcon('home');
            case 'dots':
                return new IonIcon('apps-outline');
            case 'dots-filled':
                return new IonIcon('apps');
            case 'grid':
                return new IonIcon('grid-outline');
            case 'grid-filled':
                return new IonIcon('grid');
            case 'rocket':
                return new IonIcon('rocket-outline');
            case 'rocket-filled':
                return new IonIcon('rocket');
            default:
                return new IonIcon('home-outline');
        }
    }
}
