import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import BrowserFrameRenderer from 'src/BrowserFrameRenderer';
import BrowserPreferences from 'src/BrowserPreferences';
import BrowserFrameModel from 'src/Models/BrowserFrameModel';
import AddWidgetButton from './components/AddWidgetButton';

export default class PartitionComponentOrganizer extends BrowserFrameRenderer {
    constructor(model: BrowserFrameModel) {
        super(model);

        this.background(HColor('gray5')).rounded().padding();
    }

    protected override updateBrowserFrame(): void {
        this.removeAllChildren().addChildren(
            ...this.model.partitions.map((partition, partitionIndex) =>
                new HStack(
                    ...(partition.components.length == 0
                        ? [new AddWidgetButton(partitionIndex, 0)]
                        : partition.components.map(component =>
                              new IonIcon(component.icon || '').foreground(
                                  BrowserPreferences.getPrimaryColor()
                              )
                          ))
                ).width(partition.size || 'auto')
            )
        );
    }
}
