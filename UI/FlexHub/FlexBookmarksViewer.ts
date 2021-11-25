import FlexBookmarkItem from '@Components/hub/FlexBookmarkItem';
import HubTitlebar from '@Components/hub/HubTitlebar';
import { HColor } from '@Hi/Colors';
import DetailsView, { DetailsSummaryView } from '@Hi/Components/DetailsView';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import ScrollView from '@Hi/Components/ScrollView';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
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

                            ...flexarch
                                .getWindowList()
                                .map(meta => new FlexBookmarkItem(meta)),
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
