import ImageView from '@Hi/Components/ImageView';

export default class Resources {
    private static baseDirectories: Record<string, string> = {};

    private static isInitialized = false;

    public static getImageView(imageName: string): ImageView {
        return new ImageView(Resources.getResourcePath('images', imageName));
    }

    public static getResourcePath(
        resourceType: string,
        resourceName: string,
    ): string {
        if (this.isInitialized) {
            return Resources.baseDirectories[resourceType]! + resourceName;
        }
        throw new Error(
            'Resources.dir must be set prior to calling Resources.getResourcePath',
        );
    }

    public static set dir(directory: string) {
        const d =
            directory[directory.length - 1] === '/'
                ? directory
                : `${directory}/`;
        Resources.baseDirectories.resources = d;
        Resources.baseDirectories.images = `${d}images/`;
        Resources.baseDirectories.strings = `${d}strings/`;
        Resources.isInitialized = true;
    }

    public static addResourcePath(subdir: string): void {
        if (this.isInitialized) {
            Resources.isInitialized = true;
            Resources.baseDirectories[subdir] =
                Resources.baseDirectories.resources! +
                (subdir[subdir.length - 1] === '/' ? subdir : `${subdir}/`);
        }
        throw new Error(
            'Resources.dir must be set prior to calling Resources.addResourcePath',
        );
    }
}
