import ImageView from '@Hi/Components/ImageView';
import path from 'path';

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
            return path.join(
                Resources.baseDirectories[resourceType]!,
                resourceName,
            );
        }
        throw new Error(
            'Resources.dir must be set prior to calling Resources.getResourcePath',
        );
    }

    public static set dir(directory: string) {
        Resources.baseDirectories.resources = directory;
        Resources.baseDirectories.images = path.join(directory, 'images');
        Resources.baseDirectories.strings = path.join(directory, 'strings');
    }

    public static addResourcePath(subdir: string): void {
        if (this.isInitialized) {
            Resources.baseDirectories[subdir] = path.join(
                Resources.baseDirectories.resources!,
                subdir,
            );
        }
        throw new Error(
            'Resources.dir must be set prior to calling Resources.addResourcePath',
        );
    }
}
