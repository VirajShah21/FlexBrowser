import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import View from '@Hi/View';
import BrowserFrameRenderer from '@UI/BrowserFrameRenderer';
import BrowserBackTaskbarButton from '@UI/components/BrowserBackTaskbarButton';
import BrowserForwardTaskbarButton from '@UI/components/BrowserForwardTaskbarButton';
import NewWindowTaskbarButton from '@UI/components/NewWindowTaskbarButton';
import RefreshTaskbarButton from '@UI/components/RefreshTaskbarButton';
import URLBar from '@UI/components/URLBar';
import BrowserFrameModel, {
    BrowserFrameComponent,
} from '@UI/Models/BrowserFrameModel';
import AddWidgetButton from './components/AddWidgetButton';

function makeComponent(model: BrowserFrameComponent): View {
    switch (model.name) {
        case 'page-back':
            return new BrowserBackTaskbarButton().font('md');
        case 'page-forward':
            return new BrowserForwardTaskbarButton().font('md');
        case 'urlbar':
            return new URLBar().font('md');
        case 'go-refresh':
            return new RefreshTaskbarButton().font('md');
        case 'new-window':
            return new NewWindowTaskbarButton().font('md');
        case 'spacer':
            return new Spacer().font('md');
        default:
            return new TextView(`NoComponent[${model.name}]`).font('md');
    }
}

export default class PartitionComponentOrganizer extends BrowserFrameRenderer {
    constructor(model: BrowserFrameModel) {
        super(model);

        this.background(HColor('gray5')).rounded().padding();
    }

    protected override updateBrowserFrame(): void {
        this.removeAllChildren().addChildren(
            ...this.model.partitions.map((partition, partitionIndex) =>
                new HStack(
                    ...partition.components.flatMap(
                        (component, componentIndex) => [
                            new AddWidgetButton(partitionIndex, componentIndex),
                            makeComponent(component),
                        ],
                    ),
                    new AddWidgetButton(
                        partitionIndex,
                        partition.components.length,
                    ),
                ).width(partition.size || 'auto'),
            ),
        );
    }
}