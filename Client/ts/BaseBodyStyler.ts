import { HIBorderProperties, HIFont } from '@Hi/Types/styles';
import RGBAModel from './RGBAModel';
import {
    edgeSizing,
    HICornerSizingValue,
    HIEdgeSizingValue,
    HISizeBounds,
    HISizingName,
    HISizingValue,
    sizing,
    SizingValues,
} from './Types/sizing';

export default abstract class BaseBodyStyler {
    public body: HTMLElement;

    protected constructor(body: HTMLElement) {
        this.body = body;
    }

    /**
     * Assigns a background image to a View via url
     *
     * @param {string} url The URL of the image to display as the background image.
     * @returns {this}
     *
     * @memberOf View
     */
    backgroundImage(url: string): this {
        this.body.style.background = `url(${url})`;
        this.body.style.backgroundSize = 'cover';
        return this;
    }

    /**
     * Assigns the background color of a View
     *
     * @param {(RGBAModel | 'none')} color The RGB color of the image, or
     * 'none' for a transparent background.
     * @returns {this}
     *
     * @memberOf View
     */
    background(color: RGBAModel | 'none'): this {
        this.body.style.background = color.toString();
        return this;
    }

    /**
     * Blurs the background of a View.
     *
     * @param {number} [radius=25] The blur radius to apply.
     * @returns {this}
     *
     * @memberOf View
     */
    blur(radius = 25): this {
        (
            this.body.style as unknown as Record<string, string>
        ).backdropFilter = `blur(${sizing(radius)})`;
        (
            this.body.style as unknown as Record<string, string>
        ).webkitBackdropFilter = `blur(${sizing(radius)})`;
        return this;
    }

    /**
     * Makes all text bold.
     *
     * @returns {this}
     *
     * @memberOf View
     */
    bold(): this {
        this.body.style.fontWeight = 'bolder';
        return this;
    }

    /**
     * Fixes a View in place. Scroll events will not affect the physical location of
     * the View relative to the top-left corner of the window.
     * For titlebars (and similar), a z-index should also be assigned to the View.
     *
     * @returns {this}
     *
     * @memberOf View
     */
    fixed(): this {
        this.body.style.position = 'fixed';
        return this;
    }

    /**
     * Add font details to a View.
     *
     * @param {(string | number | HIFont | HISizingName)} fontClass The font data to
     * provide to View's styling.
     * If a sizing value is provided ("xxs" to "xxl") then the sizing value is used.
     * All other strings are assigned to the styles font property (ex: "Arial" or "15px Arial")
     * @returns {this}
     *
     * @memberOf View
     */
    font(fontClass: string | number | HIFont | HISizingName): this {
        if (
            typeof fontClass === 'string' &&
            Object.prototype.hasOwnProperty.call(SizingValues.FONT, fontClass)
        ) {
            this.body.style.fontSize =
                SizingValues.FONT[fontClass as HISizingName];
        } else if (typeof fontClass === 'string') {
            this.body.style.font = fontClass;
        } else if (typeof fontClass === 'number') {
            this.body.style.fontSize = sizing(fontClass);
        } else if (typeof fontClass === 'object') {
            if (Object.prototype.hasOwnProperty.call(fontClass, 'family')) {
                this.body.style.fontFamily = fontClass.family!;
            }

            if (
                Object.prototype.hasOwnProperty.call(fontClass, 'size') &&
                ['number', 'string'].indexOf(typeof fontClass.size) >= 0
            ) {
                this.body.style.fontSize = sizing(fontClass.size!);
            }

            if (Object.prototype.hasOwnProperty.call(fontClass, 'color')) {
                this.foreground(fontClass.color!);
            }
        }
        return this;
    }

    /**
     * Set a foreground color for the current View. This is used font setting font-color,
     * icon color and border colors.
     *
     * @param {RGBAModel} color The color to assign to the foreground.
     * @returns {this}
     *
     * @memberOf View
     */
    foreground(color: RGBAModel): this {
        this.body.style.color = color.toString();
        return this;
    }

    /**
     * Defines a View as an inline component.
     *
     * @returns {this}
     *
     * @memberOf View
     */
    inline(): this {
        this.body.style.display = 'inline-flex';
        return this;
    }

    /**
     * Allows the View to be positioned relative to its original position by
     * using `setTop(#)`, `setLeft(#)`, `setBottom(#)`, and `setTop(#)
     *
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    relative(): this {
        this.body.style.position = 'relative';
        return this;
    }

    /**
     * Grows the View to take up all available space in a `Stack`.
     *
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    grow(): this {
        this.body.style.flexGrow = '1';
        return this;
    }

    /**
     * Adds a glow (drop shadow) to the View.
     *
     * @param {RGBAModel} color The glow color.
     * @param {HISizingValue} [size=10] The spread of the glow.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    glow(color: RGBAModel, size: HISizingValue = 10): this {
        this.body.style.setProperty(
            'box-shadow',
            `0 0 ${sizing(size)} ${color.toString()}`,
        );
        return this;
    }

    /**
     * Sets the z-index (position along z-axis) of the View. When used in
     * conjuction with `position`, the View will either appear in front of or
     * behind other Views.
     *
     * @param {number} index The position along the z-axis to position the
     * View.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    zIndex(index: number): this {
        this.body.style.zIndex = `${index}`;
        return this;
    }

    /**
     * Toggles the resize marker on a View. The direction can be specified
     * by indicated which axis the resize should allow. Resizability can
     * be enabled horizontally (`'h'`), vertically (`'v'`), horizontally
     * **and** vertically (`'both'`), or can be completely removed by using
     * `none`.
     *
     * @param {('h' | 'v' | 'both' | 'none')} [axis] The axis to enable
     * resizability.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    public resizable(axis?: 'h' | 'v' | 'both' | 'none'): this {
        if (!axis) this.body.style.resize = 'both';
        else {
            switch (axis) {
                case 'h':
                    this.body.style.resize = 'horizontal';
                    break;
                case 'v':
                    this.body.style.resize = 'vertical';
                    break;
                default:
                    this.body.style.resize = axis;
            }
        }
        return this;
    }

    // * Frame Modifiers

    /**
     * Stretches the width and height of the View to match the width and
     * height of its parent.
     *
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    stretch(): this {
        return this.width('100%').height('100%');
    }

    /**
     * Adds a border on all four sides of the View's frame.
     * To target specific edges, use [[borderTop]], [[borderRight]],
     * [[borderBottom]], and/or [[borderLeft]].
     *
     * @param {HIBorderProperties} options The changes to apply to all four
     * edges of the View's frame.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    border(options: HIBorderProperties): this {
        if (options.size !== undefined) {
            this.body.style.borderWidth = sizing(options.size);
        }
        if (options.color) {
            this.body.style.borderColor = options.color.toString();
        }
        if (options.style) this.body.style.borderStyle = options.style;

        return this;
    }

    /**
     * Adds a border to only the top of the View's frame.
     *
     * @param {HIBorderProperties} options The changes to apply to the top
     * edge of the View's frame.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    borderTop(options: HIBorderProperties): this {
        if (options.size !== undefined) {
            this.body.style.borderTopWidth = sizing(options.size);
        }

        if (options.color) {
            this.body.style.borderTopColor = options.color.toString();
        }

        if (options.style) this.body.style.borderTopStyle = options.style;

        return this;
    }

    /**
     * Adds a border to only the right of the View's frame.
     *
     * @param {HIBorderProperties} options The changes to apply to the right
     * edge of the View's frame.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    borderRight(options: HIBorderProperties): this {
        if (options.size !== undefined) {
            this.body.style.borderRightWidth = sizing(options.size);
        }

        if (options.color) {
            this.body.style.borderRightColor = options.color.toString();
        }

        if (options.style) this.body.style.borderRightStyle = options.style;

        return this;
    }

    /**
     * Adds a border to only the bottom of the View's frame.
     *
     * @param {HIBorderProperties} options The changes to apply to the bottom
     * edge of the View's frame.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    borderBottom(options: HIBorderProperties): this {
        if (options.size !== undefined) {
            this.body.style.borderBottomWidth = sizing(options.size);
        }

        if (options.color) {
            this.body.style.borderBottomColor = options.color.toString();
        }

        if (options.style) this.body.style.borderBottomStyle = options.style;

        return this;
    }

    /**
     * Adds a border to only the bottom of the View's frame.
     *
     * @param {HIBorderProperties} options The changes to apply to the bottom
     * edge of the View's frame.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    borderLeft(options: HIBorderProperties): this {
        if (options.size !== undefined) {
            this.body.style.borderLeftWidth = sizing(options.size);
        }

        if (options.color) {
            this.body.style.borderLeftColor = options.color.toString();
        }

        if (options.style) this.body.style.borderLeftStyle = options.style;

        return this;
    }

    /**
     * Adds spacing between a View and the content/children of the View.
     *
     * @param {HIEdgeSizingValue} [amount] The amount of padding to apply.
     * This value should be an `HIEdgeSizingValue`, which means it can specify
     * either a `number` (in pixels), a `string` with a valid CSS sizing value
     * or an object containing specific edges and their valid sizing values.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    padding(amount?: HIEdgeSizingValue): this {
        if (amount !== undefined) {
            const mapping = edgeSizing(amount);

            if (mapping.top) this.body.style.paddingTop = sizing(mapping.top);

            if (mapping.right) {
                this.body.style.paddingRight = sizing(mapping.right);
            }

            if (mapping.bottom) {
                this.body.style.paddingBottom = sizing(mapping.bottom);
            }

            if (mapping.left) {
                this.body.style.paddingLeft = sizing(mapping.left);
            }
        } else this.body.style.padding = '10px';

        return this;
    }

    /**
     * Adds spacing between a View and other surrounding Views.
     *
     * @param {HIEdgeSizingValue} [amount] The distance to push away other
     * Views. This value should be an `HIEdgeSizingValue`, which means it can
     * specify either a `number` (in pixels), a `string` with a valid CSS
     * sizing value or an object containing specific edges and their valid
     * sizing values.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    margin(amount?: HIEdgeSizingValue): this {
        if (amount !== undefined) {
            const mapping = edgeSizing(amount);

            if (mapping.top !== undefined) {
                this.body.style.marginTop = sizing(mapping.top);
            }

            if (mapping.right !== undefined) {
                this.body.style.marginRight = sizing(mapping.right);
            }

            if (mapping.bottom !== undefined) {
                this.body.style.marginBottom = sizing(mapping.bottom);
            }

            if (mapping.left !== undefined) {
                this.body.style.marginLeft = sizing(mapping.left);
            }
        } else this.body.style.margin = '10px';
        return this;
    }

    /**
     * Makes the corners of a View rounded by a specified amount. If no
     * value is provided than the default roundness of `10px` is used.
     *
     * @param {HICornerSizingValue} [amount] The radius to curve
     * the edges by. This value should be an `HIEdgeSizingValue`, which means
     * it can specify either a `number` (in pixels), a `string` with a valid
     * CSS sizing value or an object containing specific edges and their valid
     * sizing values.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    rounded(amount?: HICornerSizingValue): this {
        if (amount !== undefined) {
            if (typeof amount === 'string' || typeof amount === 'number') {
                this.body.style.borderRadius = sizing(amount);
            } else {
                if (amount.top) {
                    if (amount.top.left !== undefined) {
                        this.body.style.borderTopLeftRadius = sizing(
                            amount.top.left,
                        );
                    }
                    if (amount.top.right !== undefined) {
                        this.body.style.borderTopRightRadius = sizing(
                            amount.top.right,
                        );
                    }
                }
                if (amount.bottom) {
                    if (amount.bottom.left !== undefined) {
                        this.body.style.borderBottomLeftRadius = sizing(
                            amount.bottom.left,
                        );
                    }
                    if (amount.bottom.right !== undefined) {
                        this.body.style.borderBottomRightRadius = sizing(
                            amount.bottom.right,
                        );
                    }
                }
            }
        } else this.body.style.borderRadius = '10px';

        return this;
    }

    /**
     * Adjusts the width of the View's frame.
     *
     * @param {HISizeBounds} frameWidth The width of the frame. To define
     * a minimum and maximum width, then you can pass an object containing
     * the minimum and maximum height.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    width(frameWidth: HISizeBounds): this {
        if (typeof frameWidth === 'string' || typeof frameWidth === 'number') {
            this.body.style.width = sizing(frameWidth);
        } else {
            if (frameWidth.min) {
                this.body.style.minWidth = sizing(frameWidth.min);
            }
            if (frameWidth.max) {
                this.body.style.maxWidth = sizing(frameWidth.max);
            }
            if (frameWidth.default) {
                this.body.style.width = sizing(frameWidth.default);
            }
        }

        return this;
    }

    /**
     * Adjusts the height of the View's frame.
     *
     * @param {HISizeBounds} frameHeight The height of the frame. To define
     * a minimum and maximum height, then you can pass an object containing
     * the minimum and maximum height.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    height(frameHeight: HISizeBounds): this {
        if (
            typeof frameHeight === 'string' ||
            typeof frameHeight === 'number'
        ) {
            this.body.style.height = sizing(frameHeight);
        } else {
            if (frameHeight.min) {
                this.body.style.minHeight = sizing(frameHeight.min);
            }

            if (frameHeight.max) {
                this.body.style.maxHeight = sizing(frameHeight.max);
            }

            if (frameHeight.default) {
                this.body.style.height = sizing(frameHeight.default);
            }
        }

        return this;
    }

    // * Position Modifiers

    /**
     * @deprecated
     *
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    absolute(): this {
        this.body.style.position = 'absolute';
        return this;
    }

    /**
     * Assigns the positioning of the View. By default all Views are
     * positioned statically unless it is overriden. The possible
     * positioning values are as listed:
     *
     * - `'static'` – Default positioning. The View will not be affected by
     * [[setTop]], [[setRight]], [[setBottom]], or [[setLeft]].
     * - `'relative'` – The View will be positioned relative to its static
     * position.
     * - `'fixed'` – The View will be fixed in place relative to the viewport.
     * Scrolling will not affect the position of the View.
     * - `'absolute'` – The View will be positioned relative to its closest
     * non-statically positioned ancestor. If no ancestor is non-statically
     * positioned, then it will behave like a statically-positioned View.
     * - `'sticky'` – The View will alternate between `relative` and `fixed`
     * depending on the user's scroll offset. Make sure to use `setTop` to
     * define its position.
     *
     * @param {('static' | 'relative' | 'fixed' | 'absolute' | 'sticky')} value
     * The positioning value to position the View by.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    position(
        value: 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky',
    ): this {
        this.body.style.position = value;
        return this;
    }

    /**
     * Changes the View's display method to block. The View will stretch its
     * width and its height will grow based on its children. Children can
     * still be aligned using flex containers by adding a `Stack` as a child.
     *
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    block(): this {
        this.body.style.display = 'block';
        return this;
    }

    /**
     * Changes the View's display method to flex. The View will grow based
     * on its needs.
     *
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    flex(): this {
        this.body.style.display = 'flex';
        return this;
    }

    /**
     * Sets the bottom offset of the View based on its positioning.
     *
     * @param {HISizingValue} offset The bottom offset
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     * @see position
     */
    setBottom(offset: HISizingValue): this {
        this.body.style.bottom = sizing(offset);
        return this;
    }

    /**
     * Sets the top offset of the View based on its positioning.
     *
     * @param {HISizingValue} offset The top offset
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     * @see position
     */
    setTop(offset: HISizingValue): this {
        this.body.style.top = sizing(offset);
        return this;
    }

    /**
     * Sets the left offset of the View based on its positioning.
     *
     * @param {HISizingValue} offset The left offset
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     * @see position
     */
    setLeft(offset: HISizingValue): this {
        this.body.style.left = sizing(offset);
        return this;
    }

    /**
     * Sets the right offset of the View based on its positioning.
     *
     * @param {HISizingValue} offset The right offset
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     * @see position
     */
    setRight(offset: HISizingValue): this {
        this.body.style.right = sizing(offset);
        return this;
    }

    /**
     * Defines the opacity of the View. A value of `0` is transparent, while
     * `1 is completely opaque. Any value in between is translucent following
     * the spectrum.
     *
     * @param {number} o The opacity to assign to the View.
     * @returns {this}
     *
     * @memberOf BaseBodyStyler
     */
    opacity(o: number): this {
        this.body.style.opacity = `${o}`;
        return this;
    }

    public get computed(): ComputedStyle<BaseBodyStyler> {
        const values = window.getComputedStyle(this.body);
        return {
            for: this,
            width: values.width,
            height: values.height,
            padding: [
                values.paddingTop,
                values.paddingRight,
                values.paddingBottom,
                values.paddingLeft,
            ],
            margin: [
                values.marginTop,
                values.marginRight,
                values.marginBottom,
                values.marginRight,
            ],
        };
    }
}

interface ComputedStyle<T extends BaseBodyStyler>
    extends Record<string, unknown> {
    for: T;
    width: HISizingValue;
    height: HISizingValue;
    padding: [HISizingValue, HISizingValue, HISizingValue, HISizingValue];
    margin: [HISizingValue, HISizingValue, HISizingValue, HISizingValue];
}
