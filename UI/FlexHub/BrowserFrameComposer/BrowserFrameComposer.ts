import HubTitlebar from '@Components/hub/HubTitlebar';
import { HColor } from '@Hi/Colors';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ScrollView from '@Hi/Components/ScrollView';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import BrowserFrameCanvas from './BrowserFrameCanvas';
import PartitionComponentOrganizer from './PartitionComponentOrganizer';
import PartitionerComponent from './PartitionerComponent';

export default class BrowserFrameComposer extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new HubTitlebar('Browser Frame Composer').insertBackButton(
                    true,
                ),
                new ScrollView(
                    new VStack(
                        new HStack(new BrowserFrameCanvas().width('100%'))
                            .padding()
                            .width('100%')
                            .margin({ top: 50 }),

                        new TextView('Partition Details'),

                        new PartitionerComponent(),

                        new PartitionComponentOrganizer({ partitions: [] }).id(
                            'partition-component-organizer',
                        ),
                    ).width('100%'),
                )
                    .width('100%')
                    .height('calc(100% - 100px)'),
            )
                .width('100%')
                .height('100%')
                .background(HColor('background').alpha(0.75))
                .foreground(HColor('foreground')),
        );
    }
}
