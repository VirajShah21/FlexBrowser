import ThemedButton from '@Components/TaskbarButtons/ThemedButton';
import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { defineTransition } from '@Hi/Transitions/Transition';
import { ViewController } from '@Hi/ViewController';

const hubTitlebarBuildIn = defineTransition({
    from: {
        height: 0,
        opacity: 0,
    },
    '50%': {
        opacity: 0.1,
    },
    to: {
        height: 100,
        opacity: 1,
    },
    iterations: 1,
    duration: 0.5,
    after: 'forwards',
});

const hubTitlebarBuildOut = defineTransition({
    to: {
        height: 0,
        opacity: 0,
    },
    iterations: 1,
    duration: 0.5,
    after: 'forwards',
});

/**
 * The titlebar which appears in all hub menus.
 *
 * @export
 * @class HubTitlebar
 * @extends {VStack}
 */
export default class HubTitlebar extends VStack {
    public static readonly HEIGHT = 100;

    /**
     * Creates an instance of HubTitlebar. A title must be specified.
     * Additionally, children can be added to the View. All children will
     * appear above the title. It is suggested to use an `HStack` along with
     * `.width('100%')` if adding menu items.
     * @param {string} title The title to display in the titlebar.
     * @param {...View[]} children The children to display above the title.
     *
     * @memberOf HubTitlebar
     */
    constructor(title: string) {
        super(
            new Spacer(),
            new HStack().width('100%').margin({ top: 20 }).id('titlebar-menu'),

            new HStack(
                new TextView(title).font('xxl').bold(),
                new Spacer(),
            ).width('100%'),
        );
        this.padding()
            .width('100%')
            .height(HubTitlebar.HEIGHT)
            .background(HColor('background'))
            .foreground(HColor('foreground'))
            .fixed()
            .setTop(0)
            .zIndex(100);

        this.body.style.overflow = 'hidden';
        this.body.style.setProperty('-webkit-app-region', 'drag');
    }

    public insertBackButton(appendSpacer = true): this {
        const container = this.findViewById('titlebar-menu');
        container?.addChildren(
            new ThemedButton(new TextView('Back'))
                .padding(0)
                .whenClicked(() =>
                    ViewController.getController(
                        'AppController',
                    )!.navigateBack(),
                )
                .id('back-btn'),
        );
        if (appendSpacer) this.insertSpacer();
        return this;
    }

    public insertSpacer(): this {
        this.findViewById('titlebar-menu')?.addChildren(new Spacer());
        return this;
    }

    public override handle(data: string): void {
        if (data === 'hi:buildin') this.transition(hubTitlebarBuildIn);
        else if (data === 'hi:buildout') this.transition(hubTitlebarBuildOut);
    }
}
