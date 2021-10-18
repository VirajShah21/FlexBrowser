import LocalStorageMock from './LocalStorage.mock';
import FlexArch from './flexarch.mock';
import { JSDOM } from 'jsdom';

export default function mockBrowser(): void {
    // globalThis.document = DocumentMock as unknown as Document;
    globalThis.localStorage = LocalStorageMock as unknown as Storage;
    globalThis.flexarch = FlexArch;
    // globalThis.window = globalThis as unknown as Window & typeof globalThis;
    const dom = new JSDOM('<html><head></head><body></body></html>');
    globalThis.window = dom.window as unknown as Window & typeof globalThis;
    globalThis.document = dom.window.document as Document;
}

mockBrowser();
