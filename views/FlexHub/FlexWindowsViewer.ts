import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import {
    navigateBack,
    toggleBookmarkButtonClicked,
} from '@UI/triggers/hub-triggers';
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
                            .whenClicked(navigateBack)
                            .id('back-btn'),
                        new Spacer(),
                    ).width('100%'),
                ),
                new ScrollView(
                    new VStack()
                        .width('100%')
                        .padding()
                        .id('window-buttons-container'),
                )
                    .width('100%')
                    .padding(),
                new Spacer(),
            ).stretch(),
        );

        this.background(HColor('background')).foreground(HColor('foreground'));
    }

    /**
     * Whenever any signal is sent to this screen it will refresh the
     * list of windows.
     *
     *
     * @memberOf FlexWindowViewer
     */
    override handle(): void {
        const container = this.findViewById(
            'window-buttons-container',
        ) as VStack;
        const windowList = flexarch.getWindowList();
        container.removeAllChildren().addChildren(
            ...windowList.map(win =>
                new ClickButton(
                    new HStack(
                        new IonIcon('globe-outline')
                            .font('lg')
                            .margin({ right: 10 }),
                        new TextView(win.title),
                        new Spacer(),
                        new ClickButton(new IonIcon('bookmark-outline'))
                            .describe('bookmark')
                            .whenClicked(ev =>
                                toggleBookmarkButtonClicked(ev, win),
                            ),
                    ).width('100%'),
                )
                    .width('100%')
                    .padding()
                    .background(HColor('gray5'))
                    .margin({ bottom: 10 })
                    .rounded(),
            ),
        );
    }
}
