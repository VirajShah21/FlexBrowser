import DocumentMock from './mocks/Document.mock'; // ! Must be the first import
import LocalStorageMock from './mocks/LocalStorage.mock'; // ! Same here
import MainProcessTests from './app/index.spec';
import FlexBrowserWindowSpec from './FlexBrowserWindow.spec';

globalThis.document = DocumentMock as unknown as Document;
globalThis.localStorage = LocalStorageMock as unknown as Storage;

MainProcessTests.run();
FlexBrowserWindowSpec.run();
process.exit(0);
