import IonIcon from '@Hi/Components/IonIcon';
import URLBar from '@UI/components/URLBar';
import FlexBrowserWindow from '@UI/FlexBrowserWindow';
import { expect } from 'chai';
import HTMLElementMock from '../../mocks/HTMLElement.mock';

describe('URLBar (Trigger): When keys are pressed', () => {
    let win: FlexBrowserWindow;
    let urlbar: URLBar;

    beforeEach(() => {
        win = new FlexBrowserWindow();
        urlbar = win.findViewById('url') as URLBar;
    });

    it('Should change refresh icon to go icon when input is changed', () => {
        const refreshIcon = win.findViewById('url-refresh-button') as IonIcon;

        expect((refreshIcon.body as unknown as HTMLElementMock).name).to.equal(
            'refresh-circle-outline',
        );

        (urlbar.body as unknown as HTMLElementMock).mockInput('h');

        expect((refreshIcon.body as unknown as HTMLElementMock).name).to.equal(
            'arrow-forward-outline',
        );
    });
});
