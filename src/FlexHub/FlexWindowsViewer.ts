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

/**
 * The Window (list) Viewer in the Hub.
 *
 * @export
 * @class FlexWindowViewer
 * @extends {HIFullScreenView}
 */
export default class FlexWindowViewer extends HIFullScreenView {
    /**
     * Creates an instance of FlexWindowViewer without any windows listed.
     *
     * @memberOf FlexWindowViewer
     */
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

    /**
     * Whenever any signal is sent to this screen it will refresh the
     * list of windows.
     *
     *
     * @memberOf FlexWindowViewer
     */
    override handle(): void {
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
                        ).width('100%')
                    )
                        .width('100%')
                        .padding()
                        .background(HColor('gray5'))
                        .margin({ bottom: 10 })
                        .rounded()
                )
            );
    }
}
