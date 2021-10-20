import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import View from '@Hi/View';
import { ViewController } from '@Hi/ViewController';
import HighlightColorPreferences from '../components/hub/HighlightColorPreferences';
import ThemePreferences from '../components/hub/ThemePreferences';

/**
 * @returns The main welcome screen
 */
function MainIntro() {
    return new VStack(
        new Spacer(),
        new TextView('Welcome to your new Web Browser')
            .font('xxl')
            .weight(FontWeight.UltraLight)
            .margin({ bottom: 25 }),
        new TextView('Click "Next" to continue with the setup').weight(
            FontWeight.Light,
        ),
        new Spacer(),
    ).stretch();
}

/**
 * @returns The theme setup screen
 */
function Theming() {
    return new VStack(
        new Spacer(),
        new TextView('Customize Your Colors')
            .font('xxl')
            .weight(FontWeight.UltraLight)
            .margin({ bottom: 25 }),
        new TextView(
            'Just one way to customize your browsing experience!',
        ).weight(FontWeight.Light),
        new ThemePreferences(),
        new Spacer(),
        new HighlightColorPreferences(),
        new Spacer(),
    ).stretch();
}

/**
 * The window to appear only upon first start
 *
 * @export
 * @class FirstStartPage
 * @extends {HIFullScreenView}
 */
export default class FirstStartPage extends HIFullScreenView {
    private readonly controller: ViewController;

    private pageNumber: number;

    private pages: View[] = [MainIntro(), Theming()];

    /**
     * Creates an instance of FirstStartPage.
     *
     * @memberOf FirstStartPage
     */
    constructor() {
        super(
            new VStack(
                new VStack().id('viewer').grow(),

                new HStack(
                    new ClickButton(new TextView('Back')).whenClicked(() =>
                        this.previous(),
                    ),
                    new Spacer(),
                    new ClickButton(new TextView('Next')).whenClicked(() =>
                        this.next(),
                    ),
                )
                    .width('100%')
                    .padding()
                    .background(HColor('gray').alpha(0.2)),
            )
                .background(HColor('background').alpha(0.75))
                .foreground(HColor('foreground'))
                .stretch(),
        );

        this.body.style.setProperty('-webkit-app-region', 'drag');

        this.controller = new ViewController('FSCarousel')
            .bind(this.findViewById('viewer')!.body)
            .navigateTo(this.pages[0]!);
        this.pageNumber = 0;
    }

    /**
     * Go to the next slide.
     *
     *
     * @memberOf FirstStartPage
     */
    public previous(): void {
        if (this.pageNumber > 0) this.pageNumber -= 1;
        this.controller.navigateTo(this.pages[this.pageNumber]!);
    }

    /**
     * Go to the previous slide
     *
     *
     * @memberOf FirstStartPage
     */
    public next(): void {
        this.pageNumber += 1;
        this.controller.navigateTo(this.pages[this.pageNumber]!);
    }
}
