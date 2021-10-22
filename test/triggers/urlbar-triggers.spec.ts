import URLBar from '@Components/URLBar';
import IonIcon from '@Hi/Components/IonIcon';
import TextField from '@Hi/Components/TextField';
import FlexBrowserWindow from '@UI/FlexBrowserWindow';
import { expect } from 'chai';

describe('URLBar (Trigger): When keys are pressed', () => {
    let win: FlexBrowserWindow;
    let urlbar: URLBar;
    let urlfield: TextField;

    beforeEach(() => {
        win = new FlexBrowserWindow();
        urlbar = win.findViewById('url') as URLBar;
        urlfield = urlbar.findViewById('url') as TextField;
    });

    xit('Should change refresh icon to go icon when input is changed', () => {
        const refreshIcon = win.findViewById('url-refresh-button') as IonIcon;

        expect(refreshIcon.name).to.equal('refresh-circle-outline');

        urlfield.value = 'hi';

        expect(refreshIcon.name).to.equal('arrow-forward-outline');
    });
});
