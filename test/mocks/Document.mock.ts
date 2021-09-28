import HTMLElementMock from './HTMLElement.mock';

export default class DocumentMock {
    public static body = new HTMLElementMock('body');

    public static head = new HTMLElementMock('head');

    public static querySelector(query: string): HTMLElementMock | null {
        return this.body.querySelector(query);
    }

    public static querySelectorAll(query: string): HTMLElementMock[] {
        return this.body.querySelectorAll(query);
    }

    public static createElement(tagName: string): HTMLElementMock {
        return new HTMLElementMock(tagName);
    }
}

global.document = DocumentMock as unknown as Document;
