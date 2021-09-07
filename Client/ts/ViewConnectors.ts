import ClickButton from './Components/ClickButton';
import InputField from './Components/InputField';

/**
 * Connects a form of inputs to a form wrapper
 *
 * @export
 * @class FormConnector
 */
export class FormConnector {
    public action: string;
    public inputViews: Record<string, InputField>;

    /**
     * Creates an instance of FormConnector.
     * @param {string} action The route to which the form gets posted.
     *
     * @memberOf FormConnector
     */
    constructor(action: string) {
        this.action = action;
        this.inputViews = {};
    }

    /**
     * Posts the connected form.
     *
     * @param {(response: Record<string, unknown>) => void} callback The callback to be invoked once the server responds.
     *
     * @memberOf FormConnector
     */
    post(callback: (response: Record<string, unknown>) => void): void {
        const body: Record<string, string> = {};

        for (const key in this.inputViews) body[key] = this.inputViews[key].model.value;

        fetch(this.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(body),
        })
            .then(data => data.json())
            .then(callback);
    }

    /**
     * Binds an input element to the form connector.
     *
     * @param {string} name The name field.
     * @param {InputField} field The input field.
     * @returns {this}
     *
     * @memberOf FormConnector
     */
    connectInput(name: string, field: InputField): this {
        this.inputViews[name] = field;
        return this;
    }

    /**
     * Binds a submit button to the form connector
     *
     * @param {ClickButton} button The button to be bound.
     * @param {(response: Record<string, unknown>) => void} callback The callback to be invoked once a response is provided from the server.
     * @returns {this}
     *
     * @memberOf FormConnector
     */
    connectSubmitButton(button: ClickButton, callback: (response: Record<string, unknown>) => void): this {
        button.whenClicked(() => {
            this.post(callback);
        });
        return this;
    }
}
