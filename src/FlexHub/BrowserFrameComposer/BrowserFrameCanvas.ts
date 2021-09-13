import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import TextView from '@Hi/Components/TextView';
import View from '@Hi/View';
import BrowserFrameModel, {
    BrowserFrameComponent,
} from 'src/Models/BrowserFrameModel';
import BrowserFrameRenderer from 'src/BrowserFrameRenderer';
import BrowserPreferences from 'src/BrowserPreferences';
import FlexBrowserWindow from 'src/FlexBrowserWindow';

export const defaultModel: BrowserFrameModel = {
    partitions: [
        {
            size: '25%',
            padding: {
                left: 10,
                right: 10,
            },
            components: [
                {
                    name: 'page-back',
                },
                {
                    name: 'page-forward',
                },
                {
                    name: 'spacer',
                },
            ],
        },
        {
            size: { min: 200, default: '50%', max: 600 },
            padding: {},
            components: [
                {
                    name: 'urlbar',
                },
            ],
        },
        {
            size: '25%',
            padding: {
                left: 10,
                right: 10,
            },
            components: [
                {
                    name: 'go-refresh',
                },
                {
                    name: 'spacer',
                },
                {
                    name: 'new-window',
                },
            ],
        },
    ],
};

export default class BrowserFrameCanvas extends BrowserFrameRenderer {
    constructor(model: BrowserFrameModel = defaultModel) {
        super(model);

        this.setBrowserFrameModel(model);

        this.background(HColor('gray5'))
            .foreground(BrowserPreferences.getPrimaryColor())
            .stretchWidth()
            .padding(5)
            .rounded(5);
    }

    protected override updateBrowserFrame(): void {
        this.removeAllChildren().addChildren(
            ...this.model.partitions.map(partition =>
                new HStack(
                    ...partition.components.map(component =>
                        makeComponent(component)
                    )
                )
                    .padding(partition.padding)
                    .width(partition.size || 'auto')
            )
        );
    }
}

function makeComponent(model: BrowserFrameComponent): View {
    switch (model.name) {
        case 'page-back':
            return new ClickButton(
                new IonIcon(model.icon || 'chevron-back-circle-outline')
            );
        case 'page-forward':
            return new ClickButton(
                new IonIcon(model.icon || 'chevron-forward-circle-outline')
            );
        case 'urlbar':
            return new TextField('flex://home')
                .stretchWidth()
                .textCenter()
                .id('url')
                .whenChanged(ev => {
                    const browserWindow = ev.view.root(
                        view => (view as FlexBrowserWindow).isBrowserWindow
                    ) as FlexBrowserWindow;
                    const icon = browserWindow.getViewById(
                        'url-refresh-button'
                    ) as IonIcon;

                    (icon.body as HTMLInputElement).name =
                        'arrow-forward-outline'; // ! Workaround to use .name
                })
                .noOutline()
                .whenFocused(ev =>
                    ev.view.background(HColor('background')).textStart()
                )
                .whenUnfocused(ev => ev.view.background('none').textCenter())
                .whenKeyPressed(ev => {
                    if (ev.key == 'Enter') {
                        const browserWindow = ev.view.root(
                            view => (view as FlexBrowserWindow).isBrowserWindow
                        ) as FlexBrowserWindow;
                        const searchbar = this.getViewById('url') as InputField;
                        browserWindow.goTo(searchbar.model.value);
                    }
                });
        case 'go-refresh':
            return new ClickButton(
                new IonIcon(model.icon || 'refresh-circle-outline')
            );
        case 'new-window':
            return new ClickButton(
                new IonIcon(model.icon || 'add-circle-outline')
            );
        case 'spacer':
            return new Spacer();
        default:
            return new TextView(`NoComponent[${model.name}]`);
    }
}
