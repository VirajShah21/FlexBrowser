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
    public binding: HTMLElement;

    private activeView: View;

    constructor(name: string) {
        ViewControllerData.controllers.push(this);
        document.body.style.margin = '0';
        ViewControllerData.controllerMap[name] = this;
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
    navigateTo(view: View, delay = 0): this {
        window.setTimeout(() => {
            this.binding.innerHTML = '';
            this.binding.appendChild(view.body);
        }, delay);
        this.activeView.signal('hi:buildout');
        view.signal('hi:buildin');
        this.activeView = view;

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
                view: this.activeView,
                browserEvent: ev,
            }),
        );
        return this;
    }

    /**
     * Statically access a controller via the controller's name in the registry.
     *
     * @static
     * @param {string} controllerName The name of the controller to query.
     * @returns {(ViewController | undefined)} The requested ViewController.
     * If a controller with the name is not specified, then this method will return undefined.
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
    // ! Disabled to see where it is used in project
    // ! Should only signal the activeView
    // ! [...].signalAll() should signal all open Views
    // signal(data: string): void {
    //     Object.values(this.screens).forEach(screen => screen.signal(data));
    // }
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
