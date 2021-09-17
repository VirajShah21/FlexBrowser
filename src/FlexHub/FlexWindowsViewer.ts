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
                                ViewController.navigateTo('hub'),
                            ),
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
                            .whenClicked(ev => {
                                const bookmarkIcon = (
                                    ev.view.children[0] as IonIcon
                                ).body as HTMLInputElement;

                                if (ev.view.description === 'bookmark') {
                                    flexarch.addBookmark(win);
                                    bookmarkIcon.name = 'bookmark';
                                    ev.view.describe('unbookmark');
                                } else if (
                                    ev.view.description === 'unbookmark'
                                ) {
                                    // TODO: Enable removeBookmark()
                                    // flexarch.removeBookmark(win);
                                    bookmarkIcon.name = 'bookmark-outline';
                                    ev.view.describe('bookmark');
                                }
                            }),
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
