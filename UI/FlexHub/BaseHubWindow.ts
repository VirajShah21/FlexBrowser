import HubTitlebar from '@Components/hub/HubTitlebar';
import { HColor } from '@Hi/Colors';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import ScrollView from '@Hi/Components/ScrollView';
import VStack from '@Hi/Components/VStack';
import View from '@Hi/View';

export default class BaseHubWindow extends HIFullScreenView {
    constructor(title: string, ...children: View[]) {
        super(
            new VStack(
                new HubTitlebar(title).insertBackButton(true),

                new ScrollView(new VStack(...children).padding())
                    .height('100%')
                    .width('100%')
                    .padding({ top: HubTitlebar.HEIGHT }),
            )
                .stretch()
                .background(HColor('background').alpha(0.5))
                .foreground(HColor('foreground')),
        );
    }
}
