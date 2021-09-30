import { ViewControllerData } from './ViewController';

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

/**
 * A wrapper class for standard red-green-blue colors.
 *
 * @export
 * @class RGBAModel
 */
export class RGBAModel {
    public static readonly WHITE = new RGBAModel(255, 255, 255);

    public static readonly BLACK = new RGBAModel(0, 0, 0);

    public r: number;

    public g: number;

    public b: number;

    public a: number;

    /**
     * Creates an instance of RGBAModel.
     * @param {number} r The amount of red (0 to 255).
     * @param {number} g The amount of green (0 to 255).
     * @param {number} b The amount of blue (0 to 255).
     * @param {number} [a=1] The amount of alpha (0 to 1). This is also
     * referred to as opacity.
     *
     * @memberOf RGBAModel
     */
    constructor(r: number, g: number, b: number, a = 1) {
        const c = [r, g, b, a];

        if (r < 0) c[0] = 0;
        else if (r > 255) c[0] = 255;

        if (g < 0) c[1] = 0;
        else if (g > 255) c[1] = 255;

        if (b < 0) c[2] = 0;
        else if (b > 255) c[2] = 255;

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    /**
     * Change the red value of this color.
     *
     * @param {number} r New red value.
     * @returns {this}
     *
     * @memberOf RGBAModel
     */
    red(r: number): this {
        if (r < 0) this.r = 0;
        else if (r > 255) this.r = 255;
        return this;
    }

    /**
     * Change the green value of this color.
     *
     * @param {number} r New green value.
     * @returns {this}
     *
     * @memberOf RGBAModel
     */
    green(g: number): this {
        if (g < 0) this.g = 0;
        else if (g > 255) this.g = 255;
        return this;
    }

    /**
     * Change the blue value of this color.
     *
     * @param {number} r New blue value.
     * @returns {this}
     *
     * @memberOf RGBAModel
     */
    blue(b: number): this {
        if (b < 0) this.b = 0;
        else if (b > 255) this.b = 255;
        return this;
    }

    /**
     * Change the alpha value of this color. This can be used to change
     * the opacity of a background color or foreground color.
     *
     * @param {number} a The new alpha value (0 - 1).
     * @returns {this}
     *
     * @memberOf RGBAModel
     */
    alpha(a: number): this {
        this.a = a;
        return this;
    }

    /**
     * Converts this `RGBAModel` to a CSS-valid rgb or rgba definition.
     *
     * - rgb format: 'rgb($r, $g, $b)`
     * - rgba format: 'rgba($r, $g, $b, $a)`
     *
     * @returns {string} If this color's alpha value is `1` (completely
     * opaque), then only an `rgb` string is returned, otherwise an
     * `rgba` string is returned.
     *
     * @memberOf RGBAModel
     */
    toString(): string {
        if (this.a !== 1) {
            return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        }
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    /**
     * Generates a copy of an `RGBAModel`.
     *
     * @static
     * @param {RGBAModel} rgba The color to copy.
     * @returns {RGBAModel} A brand new `RGBAModel` object.
     *
     * @memberOf RGBAModel
     */
    static copy(rgba: RGBAModel): RGBAModel {
        return new RGBAModel(rgba.r, rgba.g, rgba.b, rgba.a);
    }
}

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

export const HumanColorSwatch: Record<string, Record<string, RGBAModel>> = {
    light: {
        blue: rgb(0, 122, 255),
        brown: rgb(162, 132, 94),
        cyan: rgb(50, 173, 230),
        green: rgb(52, 199, 89),
        indigo: rgb(88, 86, 214),
        mint: rgb(0, 199, 190),
        orange: rgb(255, 149, 0),
        pink: rgb(255, 45, 85),
        purple: rgb(175, 82, 222),
        red: rgb(255, 59, 48),
        teal: rgb(48, 176, 199),
        yellow: rgb(255, 204, 0),
        gray: rgb(142, 142, 147),
        gray2: rgb(174, 174, 178),
        gray3: rgb(199, 199, 204),
        gray4: rgb(209, 209, 214),
        gray5: rgb(229, 229, 234),
        gray6: rgb(242, 242, 247),
        foreground: rgb(0, 0, 0),
        background: rgb(255, 255, 255),
    },
    dark: {
        blue: rgb(10, 132, 255),
        brown: rgb(172, 142, 104),
        cyan: rgb(100, 210, 255),
        green: rgb(48, 209, 88),
        indigo: rgb(94, 92, 230),
        mint: rgb(102, 212, 207),
        orange: rgb(255, 159, 10),
        pink: rgb(255, 55, 95),
        purple: rgb(191, 90, 242),
        red: rgb(255, 69, 58),
        teal: rgb(64, 200, 224),
        yellow: rgb(255, 214, 10),
        gray: rgb(142, 142, 147),
        gray2: rgb(99, 99, 102),
        gray3: rgb(72, 72, 74),
        gray4: rgb(58, 58, 60),
        gray5: rgb(44, 44, 46),
        gray6: rgb(28, 28, 30),
        foreground: rgb(255, 255, 255),
        background: rgb(0, 0, 0),
    },
};

let colorTheme: 'light' | 'dark' = (() => {
    const tmp = localStorage.getItem('hi://theme');
    if (tmp === 'light' || tmp === 'dark') return tmp;
    return 'light';
})();

/**
 * Changes and saves the color theme to `localStorage`.
 *
 * @export
 * @param {('light' | 'dark')} theme The theme mode to change to.
 */
export function changeTheme(theme: 'light' | 'dark'): void {
    colorTheme = theme;
    ViewControllerData.controllers.forEach(controller =>
        controller.signal('color'),
    );
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
 * @returns {RGBAModel} The average image color.
 */
export function getAverageRGB(imgEl: HTMLImageElement): RGBAModel {
    const blockSize = 5; // only visit every 5 pixels
    const canvas = document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');
    const model = new RGBAModel(0, 0, 0);
    let data;
    let i = -4;
    let count = 0;

    if (!context) {
        return model;
    }

    const height = (canvas.height =
        imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height);
    const width = (canvas.width =
        imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width);

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */
        return model;
    }

    const { length } = data.data;

    while ((i += blockSize * 4) < length) {
        ++count;
        model.r += data.data[i]!;
        model.g += data.data[i + 1]!;
        model.b += data.data[i + 2]!;
    }

    // ~~ used to floor values
    model.r = ~~(model.r / count);
    model.g = ~~(model.g / count);
    model.b = ~~(model.b / count);

    return model;
}
