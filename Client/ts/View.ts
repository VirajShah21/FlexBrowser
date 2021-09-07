import { RGBAModel } from './Colors';
import { HumanEvent } from './ViewController';
import {
    HIEdgeSizingValue,
    HICornerSizingValue,
    HISizeBounds,
    HISizingValue,
    SizingValues,
    HISizingName,
    sizing,
    edgeSizing,
} from './Types/sizing';
import { StateObject, StateProxy } from './Types/states';
import { HIFont, HIBorderProperties } from './Types/styles';

interface ModelData {
    viewName: string;
    name: string;
    id: string;
    classList: string[];
    children: ModelData[];
}

/**
 * Status codes for the parent to use
 *
 * @export
 * @enum {number}
 */
export enum PStatus {
    Visible,
    Invisible,
    Destroyed,
    Null = 0,
}

/**
 * The base class for all Human Interface views and components.
 *
 * @export
 * @abstract
 * @class View
 */
export default abstract class View {
    public body: HTMLElement;
    public parent?: View;
    public description?: string;
    public identifier: string;
    public pstatus: PStatus = PStatus.Visible;

    public readonly children: StateProxy<View[]>;
    protected readonly $children: View[] = [];

    constructor(element: string, ...children: View[]) {
        this.body = document.createElement(element);
        this.addClass('hi-view');
        this.children = StateObject(this.$children, () => {
            this.buildChildren();
        });
        children.forEach(child => {
            this.$children.push(child);
        });
        this.buildChildren();
    }

    /**
     * Retrieves a list of all child Views with the specified class name.
     *
     * @param className The classname of all the views to query.
     * @returns An array of Views with a matching classname.
     */
    getViewsByClass(className: string): View[] {
        const results = [];
        if (this.$children) {
            for (const child of this.$children) {
                if (child.getClassList().indexOf(className) >= 0) results.push(child);
                child.getViewsByClass(className).forEach(view => {
                    results.push(view);
                });
            }
        }
        return results;
    }

    /**
     * Retrieve the first child View with a specified ID.
     *
     * @param {string} id The ID of the View to query.
     * @returns {(View | null)} A View, if one with the corresponding ID is found. Null otherwise.
     *
     * @memberOf View
     */
    getViewById(id: string): View | null {
        for (const child of this.$children) {
            if (child.identifier == id) return child;
            const childResult = child.getViewById(id);
            if (childResult) return childResult;
        }
        return null;
    }

    /**
     * Retrieve the raw data of the DOM structure of this View.
     *
     * @returns {ModelData} The ModelData object associated with this View.
     *
     * @memberOf View
     */
    getModelData(): ModelData {
        return {
            viewName: this.constructor.name,
            name: `${this.constructor.name}${
                this.body.id.trim().length > 0 ? `#${this.body.id.trim()}` : ''
            }.${this.getClassList().join('.')}`,
            id: this.body.id,
            classList: this.getClassList(),
            children: this.$children.map(child => child.getModelData()),
        };
    }

    /**
     * Describes a View. The description is not displayed, but rather used internally or to store data.
     *
     * @param {string} description The description of to assign to this View.
     * @returns {this}
     *
     * @memberOf View
     */
    describe(description: string): this {
        this.description = description;
        return this;
    }

    /**
     * Destroys this View. The View will be completely destroyed and cannot be rebuilt.
     *
     *
     * @memberOf View
     */
    destroy(): void {
        // Remove from parent
        if (this.parent && this.parent.$children) this.parent.$children.splice(this.parent.children.indexOf(this), 1);
        this.body.remove();

        // Clear all instance variables
        this.parent = undefined;
    }

    /**
     * Adds a list of children after all the children of this View.
     *
     * @param {...View[]} children The children to add.
     * @returns {this}
     *
     * @memberOf View
     */
    addChildren(...children: View[]): this {
        children.forEach(child => {
            this.children.push(child);
        });
        return this;
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
     * @param {(RGBAModel | 'none')} color The RGB color of the image, or 'none' for a transparent background.
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
        (this.body.style as unknown as Record<string, string>).backdropFilter = `blur(${sizing(radius)})`;
        (this.body.style as unknown as Record<string, string>).webkitBackdropFilter = `blur(${sizing(radius)})`;
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
     * Adds a class to the class list of a View. This is also applied to the HTMLElement
     *
     * @param {string} classname The classname (or multiple classnames delimited by spaces).
     * @returns {this}
     *
     * @memberOf View
     */
    addClass(classname: string): this {
        this.body.className += ` ${classname}`;
        this.body.className = this.body.className.trim();
        return this;
    }

    /**
     * Retrieves a list of the classnames assigned to this View.
     *
     * @returns {string[]} An array of classname strings.
     *
     * @memberOf View
     */
    getClassList(): string[] {
        const classString = this.body.className;
        return classString.split(' ').filter(className => {
            return className.trim() != '';
        });
    }

    /**
     * Fixes a View in place. Scroll events will not affect the physical location of the View relative to the top-left corner of the window.
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
     * @param {(string | number | HIFont | HISizingName)} fontClass The font data to provide to View's styling.
     * If a sizing value is provided ("xxs" to "xxl") then the sizing value is used.
     * All other strings are assigned to the styles font property (ex: "Arial" or "15px Arial")
     * @returns {this}
     *
     * @memberOf View
     */
    font(fontClass: string | number | HIFont | HISizingName): this {
        if (typeof fontClass == 'string' && Object.prototype.hasOwnProperty.call(SizingValues.FONT, fontClass)) {
            this.body.style.fontSize = SizingValues.FONT[fontClass as HISizingName];
        } else if (typeof fontClass == 'string') {
            this.body.style.font = fontClass;
        } else if (typeof fontClass == 'number') this.body.style.fontSize = sizing(fontClass);
        else if (typeof fontClass == 'object') {
            if (Object.prototype.hasOwnProperty.call(fontClass, 'family'))
                this.body.style.fontFamily = fontClass.family!;
            if (
                Object.prototype.hasOwnProperty.call(fontClass, 'size') &&
                ['number', 'string'].indexOf(typeof fontClass.size) >= 0
            )
                this.body.style.fontSize = sizing(fontClass.size!);
            if (Object.prototype.hasOwnProperty.call(fontClass, 'color')) this.foreground(fontClass.color!);
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

    forChild(iteratee: (child: View) => void): this {
        for (const child of this.$children) iteratee(child);
        return this;
    }

    inline(): this {
        this.body.style.display = 'inline-flex';
        return this;
    }

    relative(): this {
        this.body.style.position = 'relative';
        return this;
    }

    removeClass(classname: string): this {
        const classes = this.getClassList() as string[];
        if (classes.indexOf(classname) >= 0) classes.splice(classes.indexOf(classname), 1);
        this.body.className = classes.join(' ');
        return this;
    }

    removeAllChildren(): this {
        this.$children.splice(0, this.children.length);
        return this.buildChildren();
    }

    buildChildren(): this {
        this.body.innerHTML = '';
        this.$children.forEach(child => {
            if (child && child.pstatus == PStatus.Visible) {
                child.parent = this;
                this.body.appendChild(child.body);
            }
        });
        return this;
    }

    root(stopAtView?: (view: View) => boolean): View {
        let root: View = this.parent as View;

        if (root == undefined) return this;

        if (stopAtView) {
            while (root.parent != undefined) {
                if (stopAtView(root)) return root;
                else root = root.parent;
            }
        } else while (root.parent != undefined) root = root.parent;

        return root;
    }

    title(text: string): this {
        this.body.title = text;
        return this;
    }

    id(idName: string): this {
        this.identifier = idName;
        return this;
    }

    grow(): this {
        this.body.style.flexGrow = '1';
        return this;
    }

    glow(color: RGBAModel, size: HISizingValue = 10): this {
        this.body.style.filter = `drop-shadow(0 0 ${sizing(size)} ${color.toString()})`;
        return this;
    }

    zIndex(index: number): this {
        this.body.style.zIndex = `${index}`;
        return this;
    }

    public resizable(axis?: 'h' | 'v' | 'both' | 'none'): this {
        if (!axis) this.body.style.resize = 'both';
        else
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
        return this;
    }

    // * Alignment

    alignEnd(): this {
        this.body.style.alignItems = 'flex-end';
        this.body.style.justifyContent = 'flex-end';
        return this;
    }

    alignMiddle(): this {
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';
        return this;
    }

    alignStart(): this {
        this.body.style.alignItems = 'flex-start';
        this.body.style.justifyContent = 'flex-start';
        return this;
    }

    // * Text Alignment

    textStart(): this {
        this.body.style.textAlign = 'left';
        return this;
    }

    textCenter(): this {
        this.body.style.textAlign = 'center';
        return this;
    }

    textEnd(): this {
        this.body.style.textAlign = 'right';
        return this;
    }

    // * Frame Modifiers

    stretchWidth(): this {
        this.body.style.width = '100%';
        return this;
    }

    stretchHeight(): this {
        this.body.style.height = '100%';
        return this;
    }

    stretch(): this {
        return this.stretchWidth().stretchHeight();
    }

    border(options: HIBorderProperties): this {
        if (options.size != undefined) this.body.style.borderWidth = sizing(options.size);
        if (options.color) this.body.style.borderColor = options.color.toString();
        if (options.style) this.body.style.borderStyle = options.style;

        return this;
    }

    borderTop(options: HIBorderProperties): this {
        if (options.size != undefined) this.body.style.borderTopWidth = sizing(options.size);
        if (options.color) this.body.style.borderTopColor = options.color.toString();
        if (options.style) this.body.style.borderTopStyle = options.style;

        return this;
    }

    borderRight(options: HIBorderProperties): this {
        if (options.size != undefined) this.body.style.borderRightWidth = sizing(options.size);
        if (options.color) this.body.style.borderRightColor = options.color.toString();
        if (options.style) this.body.style.borderRightStyle = options.style;

        return this;
    }

    borderBottom(options: HIBorderProperties): this {
        if (options.size != undefined) this.body.style.borderBottomWidth = sizing(options.size);
        if (options.color) this.body.style.borderBottomColor = options.color.toString();
        if (options.style) this.body.style.borderBottomStyle = options.style;

        return this;
    }

    borderLeft(options: HIBorderProperties): this {
        if (options.size != undefined) this.body.style.borderLeftWidth = sizing(options.size);
        if (options.color) this.body.style.borderLeftColor = options.color.toString();
        if (options.style) this.body.style.borderLeftStyle = options.style;

        return this;
    }

    padding(amount?: HIEdgeSizingValue): this {
        if (amount != undefined) {
            const mapping = edgeSizing(amount);
            if (mapping.top) this.body.style.paddingTop = sizing(mapping.top);
            if (mapping.right) this.body.style.paddingRight = sizing(mapping.right);
            if (mapping.bottom) this.body.style.paddingBottom = sizing(mapping.bottom);
            if (mapping.left) this.body.style.paddingLeft = sizing(mapping.left);
        } else this.body.style.padding = '10px';
        return this;
    }

    margin(amount?: HIEdgeSizingValue): this {
        if (amount != undefined) {
            const mapping = edgeSizing(amount);
            if (mapping.top != undefined) this.body.style.marginTop = sizing(mapping.top);
            if (mapping.right != undefined) this.body.style.marginRight = sizing(mapping.right);
            if (mapping.bottom != undefined) this.body.style.marginBottom = sizing(mapping.bottom);
            if (mapping.left != undefined) this.body.style.marginLeft = sizing(mapping.left);
        } else this.body.style.margin = '10px';
        return this;
    }

    rounded(amount?: HICornerSizingValue): this {
        if (amount != undefined) {
            if (typeof amount === 'string' || typeof amount === 'number') this.body.style.borderRadius = sizing(amount);
            else {
                if (amount.top) {
                    if (amount.top.left != undefined) this.body.style.borderTopLeftRadius = sizing(amount.top.left);
                    if (amount.top.right != undefined) this.body.style.borderTopRightRadius = sizing(amount.top.right);
                }
                if (amount.bottom) {
                    if (amount.bottom.left != undefined)
                        this.body.style.borderBottomLeftRadius = sizing(amount.bottom.left);
                    if (amount.bottom.right != undefined)
                        this.body.style.borderBottomRightRadius = sizing(amount.bottom.right);
                }
            }
        } else this.body.style.borderRadius = '10px';

        return this;
    }

    width(frameWidth: HISizeBounds): this {
        if (typeof frameWidth == 'string' || typeof frameWidth == 'number') this.body.style.width = sizing(frameWidth);
        else {
            if (frameWidth.min) this.body.style.minWidth = sizing(frameWidth.min);
            if (frameWidth.max) this.body.style.maxWidth = sizing(frameWidth.max);
            if (frameWidth.default) this.body.style.width = sizing(frameWidth.default);
        }

        return this;
    }

    height(frameHeight: HISizeBounds): this {
        if (typeof frameHeight == 'string' || typeof frameHeight == 'number')
            this.body.style.height = sizing(frameHeight);
        else {
            if (frameHeight.min) this.body.style.minHeight = sizing(frameHeight.min);
            if (frameHeight.max) this.body.style.maxHeight = sizing(frameHeight.max);
            if (frameHeight.default) this.body.style.height = sizing(frameHeight.default);
        }

        return this;
    }

    // * Position Modifiers

    absolute(): this {
        this.body.style.position = 'absolute';
        return this;
    }

    position(value: 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky'): this {
        this.body.style.position = value;
        return this;
    }

    block(): this {
        this.body.style.display = 'block';
        return this;
    }

    flex(): this {
        this.body.style.display = 'flex';
        return this;
    }

    setBottom(offset: HISizingValue): this {
        this.body.style.bottom = sizing(offset);
        return this;
    }

    setTop(offset: HISizingValue): this {
        this.body.style.top = sizing(offset);
        return this;
    }

    setLeft(offset: HISizingValue): this {
        this.body.style.left = sizing(offset);
        return this;
    }

    setRight(offset: HISizingValue): this {
        this.body.style.right = sizing(offset);
        return this;
    }

    opacity(o: number): this {
        this.body.style.opacity = `${o}`;
        return this;
    }

    // * Mouse Hover Event Modifiers

    whenMouseOver(callback: (ev: HumanEvent) => void): this {
        this.body.addEventListener('mouseover', browserEvent =>
            callback({
                view: this,
                type: 'MouseOver',
                browserEvent,
            })
        );
        return this;
    }

    whenMouseOut(callback: (ev: HumanEvent) => void): this {
        this.body.addEventListener('mouseout', browserEvent =>
            callback({
                view: this,
                type: 'MouseOut',
                browserEvent,
            })
        );
        return this;
    }

    signal(data: string): void {
        this.handle(data);
        this.$children.forEach(child => child.signal(data));
    }

    handle(data: string): void {
        if (data == '') {
            console.warn('Caught an empty signal');
            console.trace();
        }
    }
}
