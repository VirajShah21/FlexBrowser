export default class HTMLElementMock {
    public tagName: string;

    public style: Record<string, string>;

    public constructor(tagName: string) {
        this.tagName = tagName;
        this.style = {};
    }
}
