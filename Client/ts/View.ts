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
import { getTransitionDefintion } from './Transitions/Transition';
import BaseBodyStyler from './BaseBodyStyler';

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
export default abstract class View extends BaseBodyStyler {
    public override body: HTMLElement;
    public parent?: View;
    public description?: string;
    public identifier: string;
    public pstatus: PStatus = PStatus.Visible;

    public readonly children: StateProxy<View[]>;
    protected readonly $children: View[] = [];

    constructor(element: string, ...children: View[]) {
        super(document.createElement(element));
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
                if (child.getClassList().indexOf(className) >= 0)
                    results.push(child);
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
        if (this.parent && this.parent.$children)
            this.parent.$children.splice(this.parent.children.indexOf(this), 1);
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
     * Applies a function for each child of a parent view.
     *
     * @param {(child: View) => void} iteratee The function to run, passing the child view as a parameter.
     * @returns {this}
     *
     * @memberOf View
     */
    forChild(iteratee: (child: View) => void): this {
        for (const child of this.$children) iteratee(child);
        return this;
    }

    /**
     * Remove a classname from the classlist.
     *
     * @param {string} classname The classname to remove.
     * @returns {this}
     *
     * @memberOf View
     */
    removeClass(classname: string): this {
        const classes = this.getClassList() as string[];
        if (classes.indexOf(classname) >= 0)
            classes.splice(classes.indexOf(classname), 1);
        this.body.className = classes.join(' ');
        return this;
    }

    /**
     * Removes all children from this View.
     *
     * @returns {this}
     *
     * @memberOf View
     */
    removeAllChildren(): this {
        this.$children.splice(0, this.children.length);
        return this.buildChildren();
    }

    /**
     * Rebuilds all children and renders them to the parent View.
     *
     * @returns {this}
     *
     * @memberOf View
     */
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

    /**
     * Obtains the root element. If a parameter is provided, this will return
     * the first parent which satisfies the condition. If no parameter is
     * provided then the top-most parent is obtained.
     *
     * @param {(view: View) => boolean} [stopAtView] The conditional for the
     * View to stop at.
     * @returns {View} The View which either satisfies the provided conditional
     * function or the top-most parent.
     *
     * @memberOf View
     */
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

    /**
     * Adds a title attribute to this View.
     *
     * @param {string} text The title to set.
     * @returns {this}
     *
     * @memberOf View
     */
    title(text: string): this {
        this.body.title = text;
        return this;
    }

    /**
     * Assigns an ID to the View.
     *
     * @param {string} idName The id.
     * @returns {this}
     *
     * @memberOf View
     */
    id(idName: string): this {
        this.identifier = idName;
        return this;
    }

    // * Mouse Hover Event Modifiers

    /**
     * Adds a handler to the MouseOver event. A MouseOver event is triggered
     * when the mouse pointer appears above the View.
     *
     * @param {(ev: HumanEvent) => void} callback The function to be called
     * once the user's mouse enters the area of the View.
     * @returns {this}
     *
     * @memberOf View
     */
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

    /**
     * Adds a handler to the MouseOut event. A MouseOut event is triggered
     * when the mouse pointer leaves the area above the View.
     *
     * @param {(ev: HumanEvent) => void} callback The function to be called
     * once the user's mouse leaves the area of the View.
     * @returns {this}
     *
     * @memberOf View
     */
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

    /**
     * Sends a signal starting at this View, cascading cascading to all
     * children.
     *
     * @param {string} data The signal which is being sent.
     * @param {...unknown[]} args Any argument which should be passed to handle.
     *
     * @memberOf View
     */
    signal(data: string, ...args: unknown[]): void {
        this.handle(data, ...args);
        this.$children.forEach(child => child.signal(data, ...args));
    }

    /**
     * Handles a signal event. This method should be overriden in child
     * classes.
     *
     * @param {string} data The signal data which was recieved by `signal(...)`.
     * @param {...unknown[]} args The arguments which was recieved by `signal(...)`.
     *
     * @memberOf View
     */
    handle(data: string, ...args: unknown[]): void {
        if (data == '') {
            console.warn('Caught an empty signal');
            console.trace();
        }
    }

    /**
     * Starts a transition on this View. A transition is defined by calling
     * `defineTransition` from `Transitions/Transition`. The result of
     * `defineTransition(...)` is the transition name.
     *
     * @param {string} transitionName The name of the defined transition.
     * @returns {Promise<void>}
     *
     * @memberOf View
     */
    public async transition(transitionName: string): Promise<void> {
        return new Promise<void>(resolve => {
            const definition = getTransitionDefintion(transitionName);
            this.body.style.animationName = transitionName;
            this.body.style.animationIterationCount =
                definition.iterations + '';
            this.body.style.animationDuration = definition.duration + 's';
            if (definition.delay)
                this.body.style.animationDelay = definition.delay + 's';
            if (definition.after)
                this.body.style.animationFillMode = definition.after;
            if (definition.direction)
                this.body.style.animationDirection = definition.direction;
            setTimeout(
                () => resolve(),
                (definition.delay || 0) + definition.duration
            );
        });
    }
}
