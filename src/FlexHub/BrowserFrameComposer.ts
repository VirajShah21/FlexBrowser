import { HColor } from '@Hi/Colors';
import Group from '@Hi/Components/Group';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import { ScrollView } from '@Hi/Components/ScrollView';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import BrowserFrameCanvas from './BrowserFrameCanvas';
import HubTitlebar from './HubTitlebar';

export default class BrowserFrameComposer extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new HubTitlebar('Browser Frame Composer')
                    .background(HColor('gray6'))
                    .fixed()
                    .setTop(0)
                    .setLeft(0)
                    .zIndex(100),

                new ScrollView(
                    new VStack(
                        new TextView('Partition Details')
                            .weight(FontWeight.UltraLight)
                            .font('md'),
                        new HStack(new BrowserFrameCanvas().stretchWidth())
                            .padding()
                            .stretchWidth()
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
