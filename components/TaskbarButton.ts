import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import IonIcon from '@Hi/Components/IonIcon';
import { defineTransition } from '@Hi/Transitions/Transition';
import BrowserPreferences from '@UI/BrowserPreferences';

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
        super(icon.foreground(HColor(BrowserPreferences.colorTheme)));

        this.rounded()
            .font('xl')
            .padding(3)
            .whenMouseOver(ev => ev.view.background(HColor('gray3')))
            .whenMouseOut(ev => ev.view.background('none'))
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
