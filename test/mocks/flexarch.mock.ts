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
}
