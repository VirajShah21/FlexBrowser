import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import View from '@Hi/View';
import BrowserFrameRenderer from '@UI/BrowserFrameRenderer';
import BrowserPreferences from '@UI/BrowserPreferences';
import NewWindowTaskbarButton from 'components/NewWindowTaskbarButton';
import PageNavigationTaskbarButtons from 'components/PageNavigationTaskbarButtons';
import RefreshTaskbarButton from 'components/RefreshTaskbarButton';
import URLBar from 'components/URLBar';
import BrowserFrameModel, {
    BrowserFrameComponent,
} from '@UI/Models/BrowserFrameModel';

function makeComponent(model: BrowserFrameComponent): View {
    switch (model.name) {
        case 'page-nav':
            return new PageNavigationTaskbarButtons();
        case 'urlbar':
            return new URLBar();
        case 'go-refresh':
            return new RefreshTaskbarButton();
        case 'new-window':
            return new NewWindowTaskbarButton();
        case 'spacer':
            return new Spacer();
        default:
            return new TextView(`NoComponent[${model.name}]`);
    }
}

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
                    name: 'page-nav',
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
            .width('100%')
            .padding(5)
            .rounded(5);
    }

    protected override updateBrowserFrame(): void {
        this.removeAllChildren().addChildren(
            ...this.model.partitions.map(partition =>
                new HStack(
                    ...partition.components.map(component =>
                        makeComponent(component),
                    ),
                )
                    .padding(partition.padding)
                    .width(partition.size || 'auto'),
            ),
        );
    }
}
