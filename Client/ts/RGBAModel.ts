/**
 * A wrapper class for standard red-green-blue colors.
 *
 * @export
 * @class RGBAModel
 */
export default class RGBAModel {
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

    public isDark(): boolean {
        return (this.r + this.g + this.b) / 3 < 128;
    }

    public isLight(): boolean {
        return (this.r + this.g + this.b) / 3 >= 128;
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

    public static get BLACK(): RGBAModel {
        return new RGBAModel(0, 0, 0, 1);
    }

    public static get WHITE(): RGBAModel {
        return new RGBAModel(255, 255, 255, 1);
    }
}
