import Favicon from '@Components/Favicon';
import HubTitlebar from '@Components/hub/HubTitlebar';
import { getAverageRGB, HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TruncatedTextView from '@Hi/Components/TruncatedTextView';
import VStack from '@Hi/Components/VStack';
import RGBAModel from '@Hi/RGBAModel';
import BookmarksManager from '@Models/BookmarksManager';
import BrowserPreferences from '@Models/BrowserPreferences';
import ValidURL from '@Models/ValidURL';
import HubTitles from '@Resources/strings/HubTitles.json';

class FlexWindowsViewerItem extends ClickButton {
    private static readonly MAXLEN = 20;

    constructor(meta: URLMeta, windowId: number) {
        const image = new Favicon(new ValidURL(meta.url));

        super(
            new VStack(
                new HStack(
                    new ClickButton(
                        new IonIcon(
                            BookmarksManager.isBookmarked(
                                new ValidURL(meta.url),
                            )
                                ? 'bookmark'
                                : 'bookmark-outline',
                        )
                            .foreground(RGBAModel.WHITE.alpha(0.5))
                            .id('bookmark-icon'),
                    ).whenClicked(ev => {
                        ev.browserEvent.stopPropagation();
                        const icon = ev.view.findViewById(
                            'bookmark-icon',
                        ) as IonIcon;

                        if (
                            BookmarksManager.isBookmarked(
                                new ValidURL(meta.url),
                            )
                        ) {
                            BookmarksManager.removeBookmark(
                                new ValidURL(meta.url),
                            );
                            icon.name = 'bookmark-outline';
                        } else {
                            const validMeta = { ...meta };
                            validMeta.url = new ValidURL(meta.url).toString();
                            BookmarksManager.addBookmark(meta);
                            icon.name = 'bookmark';
                        }
                    }),
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
                    .foreground(HColor('background').alpha(0.5)),
                new Spacer(),
            ).stretch(),
        );

        this.rounded()
            .background(HColor(BrowserPreferences.colorTheme))
            .foreground(HColor('background'))
            .padding()
            .margin(12)
            .width(150)
            .height(150)
            .whenClicked(() => {
                flexarch.focusWindow(windowId);
            })
            .position('relative');

        image.whenLoaded(() => {
            const avg = getAverageRGB(image.body, 1, [RGBAModel.WHITE]);
            this.background(avg);
            if (avg.isLight()) {
                this.foreground(RGBAModel.BLACK);
                this.findViewById('window-title')?.foreground(
                    RGBAModel.BLACK.alpha(0.5),
                );
                image
                    .background(RGBAModel.BLACK)
                    .border({ color: RGBAModel.BLACK });
            } else {
                this.foreground(RGBAModel.WHITE);
                this.findViewById('window-title')?.foreground(
                    RGBAModel.WHITE.alpha(0.5),
                );
                image
                    .background(RGBAModel.WHITE)
                    .border({ color: RGBAModel.WHITE });
            }
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
