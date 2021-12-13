import BookmarkButton from '@Components/BookmarkButton';
import Favicon from '@Components/Favicon';
import ThemedButton from '@Components/TaskbarButtons/ThemedButton';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import TruncatedTextView from '@Hi/Components/TruncatedTextView';
import VStack from '@Hi/Components/VStack';
import ValidURL from '@Models/ValidURL';
import HubTitles from '@Resources/strings/HubTitles.json';
import BaseHubWindow from './BaseHubWindow';

class FlexWindowsViewerItem extends ClickButton {
    private static readonly MAXLEN = 20;

    constructor(meta: URLMeta, windowId: number) {
        const image = new Favicon(new ValidURL(meta.url));

        super(
            new VStack(
                new HStack(
                    new ClickButton(new IonIcon('close'))
                        .foreground(HColor('gray'))
                        .padding(2)
                        .margin({ left: 10 })
                        .font('lg')
                        .whenMouseOver(ev =>
                            ev.view
                                .background(HColor('gray6'))
                                .foreground(HColor('foreground')),
                        )
                        .whenMouseOut(ev =>
                            ev.view
                                .background('none')
                                .foreground(HColor('gray')),
                        ),

                    new Spacer(),

                    new BookmarkButton(meta)
                        .font('lg')
                        .foreground(HColor('foreground')),
                )
                    .position('absolute')
                    .setTop(5)
                    .setLeft(0)
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
export default class FlexWindowViewer extends BaseHubWindow {
    /**
     * Creates an instance of FlexWindowViewer without any windows listed.
     *
     * @memberOf FlexWindowViewer
     */
    constructor() {
        super(
            HubTitles.WindowsViewer,

            new HStack(
                new ThemedButton(
                    new HStack(
                        new IonIcon('add-circle-outline').font('lg'),
                        new TextView('New Window').margin({
                            left: 5,
                            right: 5,
                        }),
                    ),
                )
                    .rounded(25)
                    .border({
                        size: 2,
                        style: 'solid',
                        color: HColor('gray5'),
                    })
                    .padding(5),

                new ThemedButton(
                    new HStack(
                        new IonIcon('close-circle-outline').font('lg'),
                        new TextView('Close All').margin({ left: 5, right: 5 }),
                    ),
                )
                    .rounded(25)
                    .border({
                        size: 2,
                        style: 'solid',
                        color: HColor('gray5'),
                    })
                    .padding(5)
                    .margin({ left: 10 }),
            ).width('100%'),

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
                    .id('window-buttons-container')
                    .wrap(),
            )
                .width('100%')
                .padding(),
            new Spacer(),
        );

        this.background(HColor('background').alpha(0.75)).foreground(
            HColor('foreground'),
        );
    }
}
