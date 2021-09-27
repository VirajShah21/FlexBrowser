import HTMLElementMock from './HTMLElement.mock';

export default class DocumentMock {
    public body = new HTMLElementMock('body');

    public querySelector(query: string): HTMLElementMock | null {
        return this.body.querySelector(query);
    }

    public querySelectorAll(query: string): HTMLElementMock[] {
        return this.body.querySelectorAll(query);
    }
}

global.document = new DocumentMock() as unknown as Document;
