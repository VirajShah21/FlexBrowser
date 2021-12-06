import SectionTitle from '@Components/SectionTitle';
import ThemedButton from '@Components/ThemedButton';
import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import ScrollView from '@Hi/Components/ScrollView';
import VStack from '@Hi/Components/VStack';
import RGBAModel from '@Hi/RGBAModel';
import HumanEvent from '@Hi/Types/HumanEvent';
import View from '@Hi/View';
import BrowserPreferences from '@Models/BrowserPreferences';
import BaseHubWindow from './BaseHubWindow';

export class IconButton extends ThemedButton {
    private themeName: string;

    private iconType: string;

    private static instances: IconButton[] = [];

    constructor(iconType: string, themeName: string, ...children: View[]) {
        super(new HStack(...children));
        this.font('xl')
            .padding()
            .rounded()
            .background(RGBAModel.WHITE)
            .margin(10)
            .whenClicked(IconButton.setIconTheme);
        if (
            (BrowserPreferences.IconTheme as Record<string, string>)[
                iconType
            ] === themeName
        ) {
            this.activate();
        }
        this.themeName = themeName;
        this.iconType = iconType;
        IconButton.instances.push(this);
    }

    public activate(): this {
        IconButton.instances.forEach(instance => {
            if (instance && instance.iconType === this.iconType) {
                instance
                    .background(HColor('background'))
                    .foreground(HColor(BrowserPreferences.ColorTheme));
            }
        });
        this.background(HColor(BrowserPreferences.ColorTheme)).foreground(
            HColor('background'),
        );
        return this;
    }

    public static setIconTheme(ev: HumanEvent<IconButton>): void {
        const instance = ev.view as IconButton;
        const iconThemes = BrowserPreferences.IconTheme;
        (iconThemes as Record<string, string>)[instance.iconType] =
            instance.themeName;
        BrowserPreferences.IconTheme = iconThemes;
        instance.activate();
    }
}

export default class IconChangerPreferences extends BaseHubWindow {
    constructor() {
        super(
            'Icon Changer',
            new ScrollView(
                new VStack(
                    new SectionTitle('Back / Forward Style'),

                    new HStack(
                        new IconButton(
                            'backForward',
                            'chevron',
                            new IonIcon('chevron-back'),
                            new IonIcon('chevron-forward'),
                        ),

                        new IconButton(
                            'backForward',
                            'chevron-circle-outline',
                            new IonIcon('chevron-back-circle-outline'),
                            new IonIcon('chevron-forward-circle-outline'),
                        ),

                        new IconButton(
                            'backForward',
                            'arrow',
                            new IonIcon('arrow-back'),
                            new IonIcon('arrow-forward'),
                        ),

                        new IconButton(
                            'backForward',
                            'arrow-circle-outline',
                            new IonIcon('arrow-back-circle-outline'),
                            new IonIcon('arrow-forward-circle-outline'),
                        ),

                        new IconButton(
                            'backForward',
                            'caret-circle-outline',
                            new IonIcon('caret-back-circle-outline'),
                            new IonIcon('caret-forward-circle-outline'),
                        ),
                    )
                        .width('100%')
                        .alignStart(),

                    new HStack(
                        new IconButton(
                            'backForward',
                            'return',
                            new IonIcon('return-down-back'),
                            new IonIcon('return-up-forward'),
                        ),

                        new IconButton(
                            'backForward',
                            'chevron-circle-filled',
                            new IonIcon('chevron-back-circle'),
                            new IonIcon('chevron-forward-circle'),
                        ),

                        new IconButton(
                            'backForward',
                            'arrow-circle-filled',
                            new IonIcon('arrow-back-circle'),
                            new IonIcon('arrow-forward-circle'),
                        ),

                        new IconButton(
                            'backForward',
                            'caret-circle-filled',
                            new IonIcon('caret-back-circle'),
                            new IonIcon('caret-forward-circle'),
                        ),

                        new IconButton(
                            'backForward',
                            'caret',
                            new IonIcon('caret-back'),
                            new IonIcon('caret-forward'),
                        ),
                    )
                        .width('100%')
                        .alignStart(),

                    new SectionTitle('Reload Style'),

                    new HStack(
                        new IconButton(
                            'reload',
                            'default',
                            new IonIcon('reload-outline'),
                        ),
                        new IconButton(
                            'reload',
                            'default-circle-outline',
                            new IonIcon('reload-circle-outline'),
                        ),
                        new IconButton(
                            'reload',
                            'default-circle-filled',
                            new IonIcon('reload-circle'),
                        ),
                    )
                        .width('100%')
                        .alignStart(),

                    new HStack(
                        new IconButton(
                            'reload',
                            'alternative',
                            new IonIcon('refresh'),
                        ),
                        new IconButton(
                            'reload',
                            'alternative-circle-outline',
                            new IonIcon('refresh-circle-outline'),
                        ),
                        new IconButton(
                            'reload',
                            'alternative-circle-filled',
                            new IonIcon('refresh-circle'),
                        ),
                    )
                        .width('100%')
                        .alignStart(),

                    new SectionTitle('Hub Icon'),

                    new HStack(
                        new IconButton(
                            'hub',
                            'home-outline',
                            new IonIcon('home-outline'),
                        ),
                        new IconButton(
                            'hub',
                            'apps-outline',
                            new IonIcon('apps-outline'),
                        ),
                        new IconButton(
                            'hub',
                            'grid-outline',
                            new IonIcon('grid-outline'),
                        ),
                        new IconButton(
                            'hub',
                            'rocket-outline',
                            new IonIcon('rocket-outline'),
                        ),
                    )
                        .width('100%')
                        .alignStart(),

                    new HStack(
                        new IconButton(
                            'hub',
                            'home-filled',
                            new IonIcon('home'),
                        ),
                        new IconButton(
                            'hub',
                            'apps-filled',
                            new IonIcon('apps'),
                        ),
                        new IconButton(
                            'hub',
                            'grid-filled',
                            new IonIcon('grid'),
                        ),
                        new IconButton(
                            'hub',
                            'rocket-filled',
                            new IonIcon('rocket'),
                        ),
                    )
                        .width('100%')
                        .alignStart(),

                    // new SectionTitle(''),
                ).stretch(),
            ).stretch(),
        );
    }
}
