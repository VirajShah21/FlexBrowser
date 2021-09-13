import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import { ScrollView } from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import HubTitlebar from './components/HubTitlebar';

export default class FlexWindowViewer extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new HubTitlebar(
                    'Windows',
                    new HStack(
                        new ClickButton(new TextView('Back'))
                            .padding(0)
                            .whenClicked(() =>
                                ViewController.navigateTo('hub')
                            ),
                        new Spacer()
                    ).stretchWidth()
                ),
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

    override handle() {
        const container = this.getViewById(
            'window-buttons-container'
        ) as VStack;
        const windowList = flexarch.getWindowList();
        container
            .removeAllChildren()
            .addChildren(
                ...windowList.map(win =>
                    new ClickButton(
                        new HStack(
                            new IonIcon('globe-outline')
                                .font('lg')
                                .margin({ right: 10 }),
                            new TextView(win.title),
                            new Spacer()
                        ).stretchWidth()
                    )
                        .stretchWidth()
                        .padding()
                        .background(HColor('gray5'))
                        .margin({ bottom: 10 })
                        .rounded()
                )
            );
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
