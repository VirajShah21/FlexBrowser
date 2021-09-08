import { changeTheme, HColor, HumanColorName } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ImageView from '@Hi/Components/ImageView';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from './BrowserPreferences';
import HubTitlebar from './HubTitlebar';

export default class FlexPreferences extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new HubTitlebar(
                    'Preferences',
                    new ClickButton(new TextView('Back'))
                        .padding(0)
                        .foreground(HColor(BrowserPreferences.getColorTheme()))
                        .whenClicked(() =>
                            ViewController.getController(
                                'AppController'
                            )!.navigateTo('hub')
                        ),
                    new Spacer(),
                    new ClickButton(new TextView('Reload'))
                        .padding(0)
                        .foreground(HColor(BrowserPreferences.getColorTheme()))
                        .whenClicked(() => window.location.reload())
                ),

                HighlightColorPreferences(),

                ThemePreferences(),

                new Spacer()
            )
                .stretch()
                .background(HColor('background'))
                .foreground(HColor('foreground'))
        );
    }
}

function HighlightColorPreferences(): VStack {
    return new VStack(
        new HStack(
            new TextView('Highlight Color')
                .font('md')
                .bold()
                .margin({ bottom: 10 }),
            new Spacer()
        ).stretchWidth(),

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
            ).map(color => HighlightColorButton(color)),
            new Spacer()
        ).stretchWidth()
    )
        .stretchWidth()
        .padding();
}

function ThemePreferences(): VStack {
    return new VStack(
        new HStack(
            new TextView('Theme').font('md').bold().margin({ bottom: 10 }),
            new Spacer()
        ).stretchWidth(),

        new HStack(
            new VStack(
                new ClickButton(
                    new ImageView('assets/LightThemeThumb.png').rounded()
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
                    }),
                new TextView('Light Mode').margin({ top: 5 }).font('sm')
            ).rounded(),

            new Spacer(),

            new VStack(
                new ClickButton(
                    new ImageView('assets/DarkThemeThumb.png').rounded()
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
                    }),
                new TextView('Dark Mode').margin({ top: 5 }).font('sm')
            ).rounded(),

            new Spacer()
        ).stretchWidth()
    )
        .stretchWidth()
        .padding();
}

function HighlightColorButton(color: HumanColorName): ClickButton {
    return new ClickButton(
        new IonIcon('ellipse').font('xxl').foreground(HColor(color))
    )
        .id(`highlight-${color}`)
        .addClass('highlight-radio')
        .padding(0)
        .whenClicked(ev => {
            BrowserPreferences.setColorTheme(color);
            ev.view
                .root()
                .getViewsByClass('highlight-radio')
                .forEach(view =>
                    view.borderBottom({
                        size: 0,
                    })
                );
            ev.view
                .root()
                .getViewById(`highlight-${color}`)
                ?.borderBottom({
                    size: 3,
                    style: 'solid',
                    color: HColor('foreground'),
                });
        });
}
