export default class LocalStorageMock {
    private static data: Record<string, string> = {};

    static getItem(key: string): string | undefined {
        return LocalStorageMock.data[key];
    }

    static setItem(key: string, value: string): void {
        LocalStorageMock.data[key] = value;
    }
}

global.localStorage = LocalStorageMock as unknown as Storage;
