import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from '@UI/BrowserPreferences';
import HubTitlebar from 'components/hub/HubTitlebar';
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
                            .foreground(BrowserPreferences.getPrimaryColor())
                            .whenClicked(() =>
                                ViewController.getController(
                                    'AppController',
                                )?.navigateBack(),
                            ),
                        new Spacer(),
                    ).width('100%'),
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
