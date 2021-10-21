import HumanColorSwatch from './HumanColorSwatch';
import RGBAModel from './RGBAModel';

export type HumanColorName =
    | 'blue'
    | 'brown'
    | 'cyan'
    | 'green'
    | 'indigo'
    | 'mint'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'yellow'
    | 'gray'
    | 'gray2'
    | 'gray3'
    | 'gray4'
    | 'gray5'
    | 'gray6'
    | 'foreground'
    | 'background';

let colorTheme: 'light' | 'dark' = (() => {
    const tmp = localStorage.getItem('hi://theme');
    if (tmp === 'light' || tmp === 'dark') return tmp;
    return 'light';
})();

/**
 * Converts a color name to a usable `RGBAModel` object.
 *
 * @export
 * @param {HumanColorName} color The name of the color.
 * @returns {RGBAModel} The `RGBAModel` for the specified color name.
 */
export function HColor(color: HumanColorName): RGBAModel {
    if (colorTheme === 'light') {
        return RGBAModel.copy(HumanColorSwatch.light![color]!);
    }
    return RGBAModel.copy(HumanColorSwatch.dark![color]!);
}

/**
 * Quickly generates an `RGBAModel` if the red, green, and blue values are
 * already known.
 *
 * @export
 * @param {number} r The amount of red (0-255).
 * @param {number} g The amount of green (0-255).
 * @param {number} b The amount of blue (0-255).
 * @returns {RGBAModel} The RGBAModel composed of the provided rgb values.
 *
 * @see rgba
 */
export function rgb(r: number, g: number, b: number): RGBAModel {
    return new RGBAModel(r, g, b);
}

/**
 * Quickly generates an `RGBAModel` if the red, green, blue, and alpha
 * values are already known.
 *
 * @export
 * @param {number} r The amount of red (0-255).
 * @param {number} g The amount of green (0-255).
 * @param {number} b The amount of blue (0-255).
 * @param {number} a The amoun of alpha (0-1).
 * @returns {RGBAModel} The RGBAModel composed of the provided rgb values.
 *
 * @see rgb
 */
export function rgba(r: number, g: number, b: number, a: number): RGBAModel {
    return new RGBAModel(r, g, b, a);
}

/**
 * Changes and saves the color theme to `localStorage`.
 *
 * @export
 * @param {('light' | 'dark')} theme The theme mode to change to.
 */
export function changeTheme(theme: 'light' | 'dark'): void {
    colorTheme = theme;
    localStorage.setItem('hi://theme', colorTheme);
}

/**
 *
 *
 * @export
 * @returns {('light' | 'dark')} The theme mode.
 */
export function whichTheme(): 'light' | 'dark' {
    return colorTheme;
}

/**
 * Gets the average rgb values from an image element.
 *
 * _Note_: This function only works with raw html elements. If using with
 * a view, then use `(myImage.body as HTMLImageElement)` to access the
 * `HTMLImageElement`.
 * From: https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
 *
 * @export
 * @param {HTMLImageElement} imgEl The image element to analyze.
 * @param {number} blockSize Visits every `blockSize` pixel when analyzing
 * the image. The default value is 5, however, if you know an image will be
 * small (such as a favicon) then a value of 1 will suffice. For performance
 * in heavy applications, when analyzing larger images, a larger block size
 * should be used. This will slightly decrease accuracy, while significantly
 * improving performance.
 * @param {RGBAModel[]} ignoreColors The list of colors to ignore. For example,
 * if the background of an image is white, then you may want to ignore that color.
 * @returns {RGBAModel} The average image color.
 */
export function getAverageRGB(
    imgEl: HTMLImageElement,
    blockSize = 5,
    ignoreColors: RGBAModel[] = [],
): RGBAModel {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');
    const model = new RGBAModel(0, 0, 0);
    let data;
    let i = -4;
    let count = 0;

    if (!context) {
        return model;
    }

    const height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    const width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    canvas.height = height;
    canvas.width = width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */
        return model;
    }

    const { length } = data.data;

    while (i + blockSize * 4 < length) {
        i += blockSize * 4;
        const r = data.data[i];
        const g = data.data[i + 1];
        const b = data.data[i + 2];
        if (
            ignoreColors.filter(
                color => color.r === r && color.g === g && color.b === b,
            ).length === 0
        ) {
            count += 1;
            model.r += r!;
            model.g += g!;
            model.b += b!;
        }
    }

    model.r = Math.floor(model.r / count);
    model.g = Math.floor(model.g / count);
    model.b = Math.floor(model.b / count);

    return model;
}
