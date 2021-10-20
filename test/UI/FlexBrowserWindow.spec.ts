import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import { expect } from 'chai';
import FlexBrowserWindow from '../../views/FlexBrowserWindow';

describe('FlexBrowserWindow: URL Bar Navigation', () => {
    let win: FlexBrowserWindow;

    beforeEach(() => {
        win = new FlexBrowserWindow();
    });

    it('Should add URL to session history if (and only if) param is true', () => {
        expect(win.goTo('https://google.com/', false).length).to.equal(0);
        expect(win.goTo('https://google.com/', true)).to.eql([
            'https://google.com/',
        ]);
    });

    xit('Should change the "Go" icon to a "Reload icon"', () => {
        const icon = win.findViewById('url-refresh-button') as IonIcon;
        (icon.body as HTMLInputElement).name = 'alt-icon';
        win.goTo('https://google.com/', false);
        expect((icon.body as HTMLInputElement).name).to.equal(
            'refresh-circle-outline',
        );
    });

    it('Should update the URL Bar value', () => {
        const urlbar = win.findViewById('url') as InputField;
        win.goTo('https://virajshah.org/', false);
        expect(urlbar.value).to.equal('https://virajshah.org/');
    });
});
