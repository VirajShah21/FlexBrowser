import { expect } from 'chai';
import DocumentMock from './mocks/Document.mock';
import LocalStorageMock from './mocks/LocalStorage.mock';
import FlexBrowserWindow from '../src/FlexBrowserWindow';

globalThis.document = DocumentMock as unknown as Document;
globalThis.localStorage = LocalStorageMock as unknown as Storage;

describe('FlexBrowserWindow resolving URL Input', () => {
    it('Should convert input to a valid URL', () => {
        expect(FlexBrowserWindow.goodUrl('facebook.com')).to.equal(
            'https://facebook.com',
        );
    });
});
