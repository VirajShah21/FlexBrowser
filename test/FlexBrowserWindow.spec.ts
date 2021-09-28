import { expect } from 'chai';
import DocumentMock from './mocks/Document.mock';
import LocalStorageMock from './mocks/LocalStorage.mock';
import FlexBrowserWindow from '../src/FlexBrowserWindow';

globalThis.document = DocumentMock as unknown as Document;
globalThis.localStorage = LocalStorageMock as unknown as Storage;

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
