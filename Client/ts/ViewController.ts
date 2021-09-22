import View from './View';

export const ViewControllerData = {
    controllers: [] as ViewController[],
    controllerMap: {} as Record<string, ViewController>,
};

/**
 * A ViewController wrapper for a specific wrapper element.
 *
 * @export
 * @class ViewController
 */
export class ViewController {
    public screens: Record<string, View>;
    public binding: HTMLElement;
    public visibleScreen: string;

    constructor(screens: Record<string, View>) {
        this.screens = screens;
        ViewControllerData.controllers.push(this);
    }

    /**
     * Navigates to a screen with a specified name.
     *
     * @param {string} [name='main'] The name of the screen to navigate to.
     * "main" is implicitly passed to this parameter if not specified.
     * @param {string} [delay=0] The amount of time to wait before switching
     * the View. This is especially helpful when using build out transitions.
     * The units are in milliseconds (1000 ms = 1 s). Default value is 0.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    navigateTo(name = 'main', delay = 0): this {
        if (typeof name != 'string')
            throw new Error(
                `ViewController.navigateTo: Parameter name (1) should be of type string, instead got ${typeof name}`,
            );
        if (!Object.prototype.hasOwnProperty.call(this.screens, name))
            throw new Error(
                `ViewController.navigateTo: ViewController does not have a screen named ${name}`,
            );

        const screen = this.screens[name];

        window.setTimeout(() => {
            this.binding.innerHTML = '';

            if (screen) this.binding.appendChild(screen.body);
            else
                this.binding.append(
                    `Error: No such screen "${name}" on this ViewController"`,
                );
        }, delay);

        this.screens[this.visibleScreen]?.signal('hi:buildout');
        screen?.signal('hi:buildin');
        this.visibleScreen = name;

        return this;
    }

    /**
     * Adds a screen to the navigator wrapper.
     *
     * @param {string} name The name of the new screen.
     * @param {View} screen The view which the screen is attached to.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    addNavigator(name: string, screen: View): this {
        if (typeof name != 'string')
            throw new Error(
                `ViewController.addNavigator: Parameter name (1) should be of type string, instead got ${typeof name}`,
            );
        if (!(screen instanceof View))
            throw new Error(
                `ViewController.addNavigator: Parameter screen (2) should be of type View, instead got ${typeof screen}.\nValue: ${
                    typeof screen == 'object'
                        ? JSON.stringify(screen, null, 4)
                        : screen
                }`,
            );
        this.screens[name] = screen;
        return this;
    }

    /**
     * Binds the ViewController to a specified HTMLElement.
     *
     * @param {HTMLElement} [element=document.body] The pre-loaded HTML element to bind to.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    bind(element: HTMLElement = document.body): this {
        this.binding = element;
        return this;
    }

    /**
     * Adds an event listener for the "resize" event; when the window is resized.
     *
     * @param {(ev: HumanEvent) => void} handler The event handler.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    whenResized(handler: (ev: HumanEvent) => void): this {
        window.addEventListener('resize', ev =>
            handler({
                type: 'Resize',
                view: this.screens[this.visibleScreen] as View,
                browserEvent: ev,
            }),
        );
        return this;
    }

    /**
     * Maps this controller to a specified name in the ViewController registry.
     *
     * @param {string} controllerName The name of this controller in the registry.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    mapTo(controllerName: string): this {
        ViewControllerData.controllerMap[controllerName] = this;
        return this;
    }

    /**
     * Statically access a controller via the controller's name in the registry.
     *
     * @static
     * @param {string} controllerName The name of the controller to query.
     * @returns {(ViewController | undefined)} The requested ViewController. If a controller with the name is not specified, then this method will return undefined.
     *
     * @memberOf ViewController
     */
    public static getController(
        controllerName: string,
    ): ViewController | undefined {
        return ViewControllerData.controllerMap[controllerName];
    }

    /**
     * Send a signal to every screen attached to this ViewController.
     *
     * @param {string} data The data to signal.
     *
     * @memberOf ViewController
     */
    signal(data: string): void {
        for (const screen in this.screens)
            (this.screens[screen] as View).signal(data);
    }

    /**
     * Automatically navigates to the first found screen with the specified name on any ViewController.
     *
     * @static
     * @param {string} [name='main'] The screen name to navigate to.
     * @param {string} [delay=0] The amount of time to wait before switching
     * the View. This is especially helpful when using build out transitions.
     * The units are in milliseconds (1000 ms = 1 s). Default value is 0.
     * @returns {(ViewController | null)} The requested ViewController. If no controller is found, then null is returned.
     *
     * @memberOf ViewController
     */
    static navigateTo(name = 'main', delay = 0): ViewController | null {
        const controller = ViewControllerData.controllers.find(
            currentController => {
                return Object.prototype.hasOwnProperty.call(
                    currentController.screens,
                    name,
                );
            },
        );
        if (controller) {
            controller.navigateTo(name, delay);
            controller.visibleScreen = name;
            return controller;
        } else {
            console.warn(`Could not navigate to ${name}`);
            return null;
        }
    }

    /**
     * Puts all screens into a single contained object.
     *
     * @static
     * @returns {Record<string, View>} An object mapping screen names to the screen.
     *
     * @memberOf ViewController
     */
    static allScreens(): Record<string, View> {
        const screens: Record<string, View> = {};
        ViewControllerData.controllers.forEach(controller => {
            for (const screen in controller.screens) {
                screens[screen] = controller.screens[screen] as View;
            }
        });
        return screens;
    }
}

/**
 * An object holding the details of a triggered event
 *
 * @export
 * @interface HumanEvent
 */
export interface HumanEvent {
    view: View;
    type: string;
    browserEvent: Event;
}

export interface HumanKeyPressEvent {
    view: View;
    type: 'KeyPress';
    browserEvent: Event;
    key: string;
}

document.body.style.margin = '0';
