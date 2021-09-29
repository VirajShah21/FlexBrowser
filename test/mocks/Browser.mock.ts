import DocumentMock from './Document.mock';
import LocalStorageMock from './LocalStorage.mock';
import FlexArch from './flexarch.mock';

export default function mockBrowser(): void {
    globalThis.document = DocumentMock as unknown as Document;
    globalThis.localStorage = LocalStorageMock as unknown as Storage;
    globalThis.flexarch = FlexArch;
    globalThis.window = globalThis as unknown as Window & typeof globalThis;
}

mockBrowser();
