import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import { expect } from 'chai';
import FlexBrowserWindow from '../../views/FlexBrowserWindow';
import HTMLElementMock from '../mocks/HTMLElement.mock';

describe('FlexBrowserWindow resolving URL Input', () => {
    it('Should convert "abcd.ext" to "https://abcd.ext/"', () => {
        expect(FlexBrowserWindow.goodUrl('facebook.com')).to.equal(
            'https://facebook.com/',
        );

        expect(FlexBrowserWindow.goodUrl('virajshah.org')).to.equal(
            'https://virajshah.org/',
        );
    });

    it('Should keep "http://abcd.ext" with same protocol: "http://abcd.ext/" (with trailing slash)', () => {
        expect(FlexBrowserWindow.goodUrl('http://facebook.com')).to.equal(
            'http://facebook.com/',
        );

        expect(FlexBrowserWindow.goodUrl('http://virajshah.org/')).to.equal(
            'http://virajshah.org/',
        );
    });

    it('Should keep "https://abcd.ext" with same protocol: "https://abcd.ext/" (with trailing slash)', () => {
        expect(FlexBrowserWindow.goodUrl('https://facebook.com')).to.equal(
            'https://facebook.com/',
        );

        expect(FlexBrowserWindow.goodUrl('https://virajshah.org/')).to.equal(
            'https://virajshah.org/',
        );
    });
});

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

    it('Should change the "Go" icon to a "Reload icon"', () => {
        const icon = win.findViewById('url-refresh-button') as IonIcon;
        (icon.body as unknown as HTMLElementMock).name = 'alt-icon';
        win.goTo('https://google.com/', false);
        expect((icon.body as unknown as HTMLElementMock).name).to.equal(
            'refresh-circle-outline',
        );
    });

    it('Should update the URL Bar value', () => {
        const urlbar = win.findViewById('url') as InputField;
        win.goTo('https://virajshah.org/', false);
        expect(urlbar.value).to.equal('https://virajshah.org/');
    });
});
