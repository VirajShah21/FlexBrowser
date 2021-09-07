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

export class RGBAModel {
    public static readonly WHITE = new RGBAModel(255, 255, 255);
    public static readonly BLACK = new RGBAModel(0, 0, 0);

    public r: number;
    public g: number;
    public b: number;
    public a: number;

    constructor(r: number, g: number, b: number, a = 1) {
        if (r < 0) r = 0;
        else if (r > 255) r = 255;

        if (g < 0) g = 0;
        else if (g > 255) g = 255;

        if (b < 0) b = 0;
        else if (b > 255) b = 255;

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    red(r: number): this {
        if (r < 0) r = 0;
        else if (r > 255) r = 255;
        this.r = r;
        return this;
    }

    green(g: number): this {
        if (g < 0) g = 0;
        else if (g > 255) g = 255;
        this.g = g;
        return this;
    }

    blue(b: number): this {
        if (b < 0) b = 0;
        else if (b > 255) b = 255;
        this.b = b % 256;
        return this;
    }

    alpha(a: number): this {
        this.a = a;
        return this;
    }

    toString(): string {
        if (this.a != 1) return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    static copy(rgba: RGBAModel): RGBAModel {
        return new RGBAModel(rgba.r, rgba.g, rgba.b, rgba.a);
    }
}

export function HColor(color: HumanColorName): RGBAModel {
    if (colorTheme === 'light') {
        return RGBAModel.copy(HumanColorSwatch.light[color]);
    } else {
        return RGBAModel.copy(HumanColorSwatch.dark[color]);
    }
}

export function rgb(r: number, g: number, b: number): RGBAModel {
    return new RGBAModel(r, g, b);
}

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
    if (tmp == 'light' || tmp == 'dark') return tmp;
    return 'light';
})();

export function changeTheme(theme: 'light' | 'dark'): void {
    colorTheme = theme;
    ViewControllerData.controllers.forEach(controller => controller.signal('color'));
    localStorage.setItem('hi://theme', colorTheme);
}

export function whichTheme(): 'light' | 'dark' {
    return colorTheme;
}

/**
 * From: https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
 *
 * @export
 * @param {any} imgEl
 * @returns
 */
export function getAverageRGB(imgEl: HTMLImageElement): RGBAModel {
    const blockSize = 5, // only visit every 5 pixels
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        rgb = new RGBAModel(0, 0, 0);
    let data,
        i = -4,
        count = 0;

    if (!context) {
        return rgb;
    }

    const height = (canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height);
    const width = (canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width);

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */
        return rgb;
    }

    const length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;
}
