import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import View from '@Hi/View';
import BrowserFrameModel, { BrowserFrameComponent } from './BrowserFrameModel';
import BrowserPreferences from './BrowserPreferences';
import FlexBrowserWindow from './FlexBrowserWindow';

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

export default class BrowserFrameCanvas extends VStack {
    private model: BrowserFrameModel;

    constructor(model: BrowserFrameModel = defaultModel) {
        super(
            new HStack(
                new IonIcon('ellipse').foreground(HColor('red')),
                new IonIcon('ellipse').foreground(HColor('orange')),
                new IonIcon('ellipse').foreground(HColor('green')),
                new Spacer()
            ).stretchWidth(),
            new HStack(
                new HStack(
                    new IonIcon('chevron-back-circle-outline').font('xl'),
                    new IonIcon('chevron-forward-circle-outline').font('xl'),
                    new Spacer()
                )
                    .width('20%')
                    .padding(5),

                new Spacer(),

                new HStack(new TextField('Search or Go to URL').stretchWidth())
                    .width('60%')
                    .padding(5),

                new Spacer(),

                new HStack(
                    new IonIcon('refresh-circle-outline').font('xl'),
                    new Spacer(),
                    new IonIcon('add-circle-outline').font('xl')
                )
                    .width('20%')
                    .padding(5)
            )
                .stretchWidth()
                .id('frame-contents')
        );

        this.setBrowserFrameModel(model);

        this.background(HColor('gray5'))
            .foreground(BrowserPreferences.getPrimaryColor())
            .stretchWidth()
            .padding(5)
            .rounded()
            .rounded({ bottom: { left: 0, right: 0 } });
    }

    public setBrowserFrameModel(model: BrowserFrameModel): void {
        this.model = model;
        this.updateBrowserFrame();
    }

    private updateBrowserFrame(): void {
        const frameContents = this.getViewById('frame-contents')!;

        frameContents
            .removeAllChildren()
            .addChildren(
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
