import HTMLElementMock from './HTMLElement.mock';

export default class DocumentMock {
    public body = new HTMLElementMock('body');

    private children: HTMLElementMock[];

    // public querySelector(): HTMLElementMock {
    //     return this.children.find(element => return element)
    // }
}

global.document = new DocumentMock() as unknown as Document;
