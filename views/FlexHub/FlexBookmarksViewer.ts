import HubTitlebar from '@Components/hub/HubTitlebar';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { navigateBack } from '@Triggers/hub-triggers';
import HubTitles from '@Resources/strings/HubTitles.json';

export default class FlexBookmarksViewer extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new HubTitlebar(
                    HubTitles.BookmarksViewer,
                    new HStack(
                        new ClickButton(new TextView('Back'))
                            .whenClicked(navigateBack)
                            .padding(0)
                            .id('back-btn'),
                        new Spacer(),
                    ).width('100%'),
                ),

                new Spacer(),

                ...flexarch
                    .getBookmarks()
                    .map(bookmark =>
                        new ClickButton(new TextView(bookmark.title))
                            .width('calc(100% - 20px)')
                            .padding()
                            .rounded()
                            .background(HColor('background').alpha(0.1))
                            .margin({ bottom: 10 }),
                    ),

                new Spacer(),
            ).stretch(),
        );

        this.background(HColor('background').alpha(0.75)).foreground(
            HColor('foreground'),
        );
    }
}
