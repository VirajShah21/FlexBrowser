import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import { defineTransition } from '@Hi/Transitions/Transition';
import BrowserPreferences from '@Models/BrowserPreferences';

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

    constructor(icon: IonIcon) {
        super(icon);

        this.rounded()
            .foreground(HColor('gray'))
            .font('lg')
            .padding()
            .whenMouseOver(ev =>
                ev.view.foreground(HColor(BrowserPreferences.colorTheme)),
            )
            .whenMouseOut(ev => ev.view.foreground(HColor('gray')))
            .opacity(0);
    }

    public override handle(data: string): void {
        if (data === 'hi:buildin') {
            this.transition(this.buildin);
        } // else if (data == 'hi:buildout') {
        //     this.transition(this.buildout);
        // }
    }
}
