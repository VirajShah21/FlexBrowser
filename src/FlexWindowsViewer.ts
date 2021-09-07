import { HColor } from '@Hi/Colors';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import { ScrollView } from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';

export default class FlexWindowViewer extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new TextView('Windows')
                    .font('xxl')
                    .bold()
                    .margin({ top: 25, bottom: 25 }),
                new ScrollView(
                    new VStack()
                        .stretchWidth()
                        .padding()
                        .id('window-buttons-container')
                )
                    .stretchWidth()
                    .padding(),
                new Spacer()
            ).stretch()
        );
    }

    handle() {
        const container = this.getViewById(
            'window-buttons-container'
        ) as ScrollView;
        flexarch.getWindowList();
        container.removeAllChildren().addChildren();
    }
}

function WindowButton(title: string, favicon: string): HStack {
    return new HStack(
        new IonIcon('ellipse').padding(),
        new TextView(title).padding().foreground(HColor('gray')),
        new Spacer()
    )
        .stretchWidth()
        .background(HColor('gray6'))
        .padding()
        .rounded();
}
