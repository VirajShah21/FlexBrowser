export default class FlexArch {
    private static readonly mockFlexRcFile: FlexRC = {};

    static changeUrl(): void {}

    static newWindow(): void {}

    static getWindowList(): URLMeta[] {
        return [];
    }

    static getBookmarks(): URLMeta[] {
        return [];
    }

    static addBookmark(): void {}

    static removeBookmark(): void {}

    static pref(property: string, value?: unknown): unknown {
        if (value) this.mockFlexRcFile[property] = value;
        return this.mockFlexRcFile[property];
    }

    static getAllPreferences(): FlexRC {
        return {};
    }

    static brandRegistry(): Branding {
        return null;
    }

    static focusWindow(id: number): void {}

    static focusHub(): void {}

    static urlInfo(): URLMeta {
        return {
            title: '',
            url: '',
        };
    }

    static showTaskbar(): void {}

    static hideTaskbar(): void {}

    static setPassword(account: string, password: string): void {}

    static getPassword(account: string): Promise<string> {
        return new Promise(resolve => resolve(''));
    }

    static getAccounts(): Promise<{ account: string; password: string }[]> {
        return new Promise(resolve => resolve([]));
    }

    static reloadBrowserView(): void {}

    static async getHistory(): Promise<string> {
        return '';
    }

    static async log(): Promise<void> {}
}
