/**
 * Creates a circle icon with a specified color. The button binds to a
 * handler which assigns the browser's color theme.
 *
 * @export
 * @class HighlightColorButton
 * @extends {ClickButton}
 */
export default class HighlightColorButton extends ClickButton {
    /**
     * Creates an instance of HighlightColorButton.
     * @param {HumanColorName} color The color of the highlight button and the
     * color to switch the default theme to.
     *
     * @memberOf HighlightColorButton
     */
    constructor(color: HumanColorName) {
        super(new IonIcon('ellipse').font('xxl').foreground(HColor(color)));
        this.id(`highlight-${color}`)
            .addClass('highlight-radio')
            .padding(0)
            .whenClicked(ev => highlightColorSelected(ev, color));
    }
}

/**
 * The component containing all of the subviews for selecting a new highlight
 * color.
 *
 * @export
 * @class HighlightColorPreferences
 * @extends {VStack}
 */
export default class HighlightColorPreferences extends VStack {
    /**
     * Creates an instance of HighlightColorPreferences.
     *
     * @memberOf HighlightColorPreferences
     */
    constructor() {
        super(
            new HStack(
                new TextView('Highlight Color')
                    .font('md')
                    .bold()
                    .margin({ bottom: 10 }),
                new Spacer(),
            ).width('100%'),

            new HStack(
                ...(
                    [
                        'blue',
                        'brown',
                        'cyan',
                        'green',
                        'indigo',
                        'mint',
                        'orange',
                        'pink',
                        'purple',
                        'red',
                        'teal',
                        'yellow',
                    ] as HumanColorName[]
                ).map(color => new HighlightColorButton(color)),
                new Spacer(),
            ).width('100%'),
        );
        this.width('100%').padding();
    }
}

/**
 * Allows the user to select either a dark theme or light theme. This will
 * be rendered as a part of the main preferences page in the hub window.
 *
 * @export
 * @class ThemePreferences
 * @extends {VStack}
 */
export default class ThemePreferences extends VStack {
    constructor() {
        super(
            new HStack(
                new TextView('Theme').font('md').bold().margin({ bottom: 10 }),
                new Spacer(),
            ).width('100%'),

            new HStack(
                new VStack(
                    new ClickButton(
                        Resources.getImageView('LightThemeThumb.png').rounded(),
                    )
                        .padding(0)
                        .border({
                            size: 1,
                            style: 'solid',
                            color: HColor('gray3'),
                        })
                        .rounded()
                        .whenClicked(() => {
                            changeTheme('light');
                            flexarch.pref('theme', 'light');
                        }),
                    new TextView('Light Mode').margin({ top: 5 }).font('sm'),
                ).rounded(),

                new Spacer(),

                new VStack(
                    new ClickButton(
                        Resources.getImageView('DarkThemeThumb.png').rounded(),
                    )
                        .padding(0)
                        .border({
                            size: 1,
                            style: 'solid',
                            color: HColor('gray3'),
                        })
                        .rounded()
                        .whenClicked(() => {
                            changeTheme('dark');
                            flexarch.pref('theme', 'dark');
                        }),
                    new TextView('Dark Mode').margin({ top: 5 }).font('sm'),
                ).rounded(),

                new Spacer(),
            ).width('100%'),
        );
        this.width('100%').padding();
    }
}
