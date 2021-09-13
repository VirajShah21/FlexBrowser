import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import { ScrollView } from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import HubTitlebar from '../components/HubTitlebar';
import BrowserFrameCanvas from './BrowserFrameCanvas';
import PartitionComponentOrganizer from './PartitionComponentOrganizer';
import PartitionerComponent from './PartitionerComponent';

export default class BrowserFrameComposer extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new HubTitlebar(
                    'Browser Frame Composer',
                    new HStack(
                        new ClickButton(new TextView('Back'))
                            .padding(0)
                            .whenClicked(() =>
                                ViewController.getController(
                                    'AppController'
                                )?.navigateTo('preferences')
                            ),
                        new Spacer()
                    ).stretchWidth()
                )
                    .background(HColor('gray6'))
                    .fixed()
                    .setTop(0)
                    .setLeft(0)
                    .zIndex(100),

                new ScrollView(
                    new VStack(
                        new HStack(new BrowserFrameCanvas().stretchWidth())
                            .padding()
                            .stretchWidth()
                            .margin({ top: 50 }),

                        new TextView('Partition Details'),

                        new PartitionerComponent(),

                        new PartitionComponentOrganizer({ partitions: [] }).id(
                            'partition-component-organizer'
                        )
                    )
                        .padding({ top: 100 })
                        .stretchWidth()
                )
                    .stretchWidth()
                    .stretchHeight()
            ).stretchWidth()
        );
    }
}
