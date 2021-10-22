import HumanEvent from './Types/HumanEvent';
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

    private activeViewIndex = -1;

    private viewHistory: View[] = [];

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
        const oldView = this.activeView;
        this.viewHistory.push(view);
        this.activeViewIndex = this.viewHistory.length - 1;
        window.setTimeout(() => {
            this.binding.innerHTML = '';
            this.binding.appendChild(view.body);
            view.signal('hi:buildin');
        }, delay);
        if (oldView) oldView.signal('hi:buildout');
        return this;
    }

    navigateBack(delay = 0): this {
        const oldView = this.activeView;
        this.activeViewIndex -= 1;
        this.viewHistory.pop();
        window.setTimeout(() => {
            this.binding.innerHTML = '';
            this.binding.appendChild(
                this.viewHistory[this.activeViewIndex]!.body,
            );
            this.viewHistory[this.activeViewIndex]!.signal('hi:buildin');
        }, delay);
        if (oldView) oldView.signal('hi:buildout');
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
                view: this.viewHistory[this.activeViewIndex]!,
                browserEvent: ev,
            }),
        );
        return this;
    }

    findViewById(id: string): View | null {
        return this.viewHistory[this.activeViewIndex]!.findViewById(id);
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
    public static signalAll(data: string, ...args: unknown[]): void {
        Object.values(ViewControllerData.controllers).forEach(controller =>
            controller.signal(data, ...args),
        );
    }

    public signal(data: string, ...args: unknown[]): void {
        this.viewHistory.forEach(view => view.signal(data, ...args));
    }

    public signalActive(data: string, ...args: unknown[]): void {
        this.viewHistory[this.activeViewIndex]!.signal(data, ...args);
    }

    public signalInactive(data: string, ...args: unknown[]): void {
        this.viewHistory
            .filter(view => view !== this.viewHistory[this.activeViewIndex])
            .forEach(view => view.signal(data, ...args));
    }

    public get activeView(): View | null {
        if (
            this.activeViewIndex >= 0 &&
            this.activeViewIndex < this.viewHistory.length
        ) {
            return this.viewHistory[this.activeViewIndex]!;
        }
        return null;
    }
}

/**
 * Exposes `ViewController.signalAll()` method to browser's global scope.
 * This method is used because it is TypeScript compliant.
 * The method is exposed as `signal()`.
 */
Object.defineProperty(window, 'signal', {
    value: ViewController.signalAll,
    writable: false,
});
