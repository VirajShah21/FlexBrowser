import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import { defineTransition } from '@Hi/Transitions/Transition';
import BrowserPreferences from '@Models/BrowserPreferences';

/**
 * The base class for all buttons which appear on the Browser taskbar.
 *
 * @export
 * @class TaskbarButton
 * @extends {ClickButton}
 */
export default abstract class TaskbarButton extends ClickButton {
    public readonly buildin = defineTransition({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
        iterations: 1,
        duration: 1,
        delay: 2,
        after: 'forwards',
    });

    /**
     * Creates an instance of TaskbarButton.
     *
     * @memberOf TaskbarButton
     */
    constructor() {
        super();
        this.addChildren(this.resolveIcon())
            .rounded()
            .foreground(HColor('gray'))
            .font('lg')
            .padding()
            .whenMouseOver(ev =>
                ev.view.foreground(HColor(BrowserPreferences.ColorTheme)),
            )
            .whenMouseOut(ev => ev.view.foreground(HColor('gray')))
            .opacity(0);
    }

    /**
     * Handles the buildin of the taskbar buttons.
     *
     *
     * @memberOf TaskbarButton
     */
    public override handle(data: string): void {
        if (data === 'hi:buildin') {
            this.transition(this.buildin);
        } // else if (data == 'hi:buildout') {
        //     this.transition(this.buildout);
        // }
    }

    /**
     * Should return the correct icon based on the icon theme and
     * `TaskbarButton` type.
     */
    public abstract resolveIcon(): IonIcon;
}
