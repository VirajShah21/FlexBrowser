import { HighlightColorPreferences } from '@Components/hub/HighlightColorPreferences';
import { HColor, rgb } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import Resources from '@Hi/Resources';
import RGBAModel from '@Hi/RGBAModel';
import { ViewController } from '@Hi/ViewController';
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
        new Spacer(),
        new VStack(
            new ThemePreferences(),
            new Spacer(),
            new HighlightColorPreferences(),
        ).width('50%'),
        new Spacer(),
    ).stretch();
}

function SearchEngineButton(imageSource: string, label: string) {
    return new ClickButton(
        new VStack(
            new Spacer(),
            Resources.getImageView(imageSource).height(50).width(50),
            new Spacer(),
            new TextView(label),
            new Spacer(),
        ).stretch(),
    )
        .width(150)
        .height(150)
        .foreground(RGBAModel.WHITE)
        .rounded();
}

function DefaultSearchEngine() {
    return new VStack(
        new Spacer(),
        new TextView('Select a Search Engine')
            .font('xxl')
            .weight(FontWeight.UltraLight)
            .margin({ bottom: 25 }),
        new Spacer(),
        new HStack(
            new Spacer(),

            SearchEngineButton(
                'SearchEngines/google.png',
                'Google Search',
            ).background(HColor('blue')),

            new Spacer(),

            SearchEngineButton('SearchEngines/bing.png', 'Bing')
                .background(RGBAModel.WHITE)
                .foreground(HColor('blue')),

            new Spacer(),

            SearchEngineButton(
                'SearchEngines/duckduckgo.png',
                'DuckDuckGo',
            ).background(rgb(230, 50, 20)),

            new Spacer(),

            SearchEngineButton(
                'SearchEngines/yahoo.png',
                'Yahoo Search',
            ).background(rgb(112, 0, 217)),

            new Spacer(),
        ).width('100%'),
        new Spacer(),
    ).stretch();
}

function CollapseFrame() {
    return new VStack(
        new Spacer(),
        new TextView('Collapse the Frame')
            .font('xxl')
            .weight(FontWeight.UltraLight),
        new Spacer(),
        Resources.getImageView('fsp/CollapseTaskbar.png').width('75%'),
    ).stretch();
}

function WindowsViewerDemo() {
    return new VStack(
        new Spacer(),
        new TextView('Windows Viewer').font('xl').weight(FontWeight.Light),
        new Spacer(),
        new HStack(
            new Spacer(),
            Resources.getImageView('fsp/WindowsViewer.png').width('75%'),
        ).width('100%'),
    ).stretch();
}

function FinishedPage() {
    flexarch.newWindow();
    flexarch.focusHub();

    return new VStack(
        new TextView('You can close this window now')
            .weight(FontWeight.UltraLight)
            .position('fixed')
            .setTop(25)
            .setLeft(10),
        new Spacer(),
        new TextView('All Set Up!').font('xxl').weight(FontWeight.UltraLight),
        new Spacer(),
    );
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

    private pages: (() => VStack)[] = [
        MainIntro,
        Theming,
        DefaultSearchEngine,
        CollapseFrame,
        WindowsViewerDemo,
        FinishedPage,
    ];

    /**
     * Creates an instance of FirstStartPage.
     *
     * @memberOf FirstStartPage
     */
    constructor() {
        super(
            new VStack(
                new VStack().id('viewer').stretch(),

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
            .navigateTo(this.pages[0]!());
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
        this.controller.navigateTo(this.pages[this.pageNumber]!());
    }

    /**
     * Go to the previous slide
     *
     *
     * @memberOf FirstStartPage
     */
    public next(): void {
        this.pageNumber += 1;
        this.controller.navigateTo(this.pages[this.pageNumber]!());
    }
}
