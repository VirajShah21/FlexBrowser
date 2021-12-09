import BookmarkButton from '@Components/BookmarkButton';
import Favicon from '@Components/Favicon';
import HubTitlebar from '@Components/hub/HubTitlebar';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TruncatedTextView from '@Hi/Components/TruncatedTextView';
import VStack from '@Hi/Components/VStack';
import ValidURL from '@Models/ValidURL';
import HubTitles from '@Resources/strings/HubTitles.json';

class FlexWindowsViewerItem extends ClickButton {
    private static readonly MAXLEN = 20;

    constructor(meta: URLMeta, windowId: number) {
        const image = new Favicon(new ValidURL(meta.url));

        super(
            new VStack(
                new HStack(
                    new BookmarkButton(meta)
                        .font('lg')
                        .foreground(HColor('foreground')),
                )
                    .position('absolute')
                    .setTop(5)
                    .setLeft(0)
                    .alignEnd()
                    .width('100%'),

                new Spacer(),

                image,

                new Spacer(),

                new TruncatedTextView(meta.title, FlexWindowsViewerItem.MAXLEN),
                new TruncatedTextView(
                    new ValidURL(meta.url).shortestRepresentation,
                    FlexWindowsViewerItem.MAXLEN,
                )
                    .id('window-title')
                    .foreground(HColor('gray')),
                new Spacer(),
            ).stretch(),
        );

        this.rounded()
            .foreground(HColor('foreground'))
            .background(HColor('background'))
            .padding()
            .margin(12)
            .width(150)
            .height(150)
            .whenClicked(() => {
                flexarch.focusWindow(windowId);
            })
            .position('relative')
            .border({
                size: 1,
                style: 'solid',
                color: HColor('gray5'),
            });

        image.whenAnalyzed(ev => {
            this.borderTop({
                size: 10,
                color: ev.view.averageColor,
            });
        });
    }
}

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
                new HubTitlebar(HubTitles.WindowsViewer).insertBackButton(),
                new ScrollView(
                    new HStack(
                        ...flexarch
                            .getWindowList()
                            .map(
                                meta =>
                                    new FlexWindowsViewerItem(
                                        meta,
                                        meta.windowId ?? 0,
                                    ),
                            ),
                    )
                        .width('100%')
                        .padding()
                        .id('window-buttons-container')
                        .wrap(),
                )
                    .width('100%')
                    .padding()
                    .padding({ top: HubTitlebar.HEIGHT + 10 }),
                new Spacer(),
            ).stretch(),
        );

        this.background(HColor('background').alpha(0.75)).foreground(
            HColor('foreground'),
        );
    }
}
