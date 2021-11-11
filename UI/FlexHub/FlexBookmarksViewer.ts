import Favicon from '@Components/Favicon';
import HubTitlebar from '@Components/hub/HubTitlebar';
import ThemedButton from '@Components/ThemedButton';
import { HColor } from '@Hi/Colors';
import DetailsView, { DetailsSummaryView } from '@Hi/Components/DetailsView';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import ValidURL from '@Models/ValidURL';
import HubTitles from '@Resources/strings/HubTitles.json';
import FlexBookmarkItem from './FlexBookmarkItem';

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
                                    new ThemedButton(
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

                        ...flexarch
                            .getBookmarks()
                            .map(bookmark => new FlexBookmarkItem(bookmark)),
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
