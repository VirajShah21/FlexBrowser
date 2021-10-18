import IonIcon from '@Hi/Components/IonIcon';
import URLBar from '@Components/URLBar';
import FlexBrowserWindow from '@UI/FlexBrowserWindow';
import { expect } from 'chai';

describe('URLBar (Trigger): When keys are pressed', () => {
    let win: FlexBrowserWindow;
    let urlbar: URLBar;

    beforeEach(() => {
        win = new FlexBrowserWindow();
        urlbar = win.findViewById('url') as URLBar;
    });

    it('Should change refresh icon to go icon when input is changed', () => {
        const refreshIcon = win.findViewById('url-refresh-button') as IonIcon;

        expect(refreshIcon.name).to.equal('refresh-circle-outline');

        urlbar.value = 'h';

        expect(refreshIcon.name).to.equal('arrow-forward-outline');
    });
});
