import Favicon from '@Components/Favicon';
import HubTitlebar from '@Components/hub/HubTitlebar';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import DetailsView, { DetailsSummaryView } from '@Hi/Components/DetailsView';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import BookmarksManager from '@Models/BookmarksManager';
import ValidURL from '@Models/ValidURL';
import HubTitles from '@Resources/strings/HubTitles.json';

export default class FlexBookmarksViewer extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new HubTitlebar(HubTitles.BookmarksViewer).insertBackButton(
                    true,
                ),

                new ScrollView(
                    new VStack(
                        new DetailsView(
                            new DetailsSummaryView(
                                new TextView('Open Windows').weight(
                                    FontWeight.Bold,
                                ),
                            )
                                .textStart()
                                .foreground(HColor('gray')),
                            ...flexarch.getWindowList().map(
                                meta =>
                                    new ClickButton(
                                        new HStack(
                                            new Favicon(new ValidURL(meta.url))
                                                .width(24)
                                                .height(24),
                                            new TextView(meta.title).margin({
                                                left: 25,
                                            }),
                                            new Spacer(),
                                        ).stretch(),
                                    ),
                            ),
                        ).width('100%'),

                        new TextView('Bookmarks')
                            .weight(FontWeight.Bold)
                            .margin({ top: 20 })
                            .width('100%')
                            .textStart()
                            .foreground(HColor('gray')),

                        ...flexarch.getBookmarks().map(bookmark =>
                            new ClickButton(
                                new HStack(
                                    new TextView(bookmark.title),
                                    new Spacer(),

                                    new ClickButton(
                                        new IonIcon('bookmark')
                                            .whenMouseOver(ev => {
                                                // eslint-disable-next-line no-param-reassign
                                                (ev.view as IonIcon).name =
                                                    'trash-outline';
                                            })
                                            .whenMouseOut(ev => {
                                                // eslint-disable-next-line no-param-reassign
                                                (ev.view as IonIcon).name =
                                                    'bookmark';
                                            }),
                                    ).whenClicked(() => {
                                        BookmarksManager.removeBookmark(
                                            new ValidURL(bookmark.url),
                                        );
                                    }),
                                ).stretch(),
                            )
                                .width('calc(100% - 20px)')
                                .padding()
                                .rounded()
                                .background(HColor('background').alpha(0.1))
                                .margin({ bottom: 10 }),
                        ),
                    )
                        .stretch()
                        .padding()
                        .alignStart(),
                ).stretch(),
            )
                .stretch()
                .padding({ top: HubTitlebar.HEIGHT }),
        );

        this.background(HColor('background').alpha(0.75)).foreground(
            HColor('foreground'),
        );
    }
}
