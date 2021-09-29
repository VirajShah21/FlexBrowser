export default class CSSStyleDefinitionMock {
    setProperty(key: string, value: string): void {
        this[key] = value;
    }
}
