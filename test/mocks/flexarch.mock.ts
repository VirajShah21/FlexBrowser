export default class FlexArch {
    static changeUrl(): void {}

    static newWindow(): void {}

    static getWindowList(): URLMeta[] {
        return [];
    }

    static getBookmarks(): URLMeta[] {
        return [];
    }

    static addBookmark(): void {}
}

globalThis.flexarch = FlexArch;
