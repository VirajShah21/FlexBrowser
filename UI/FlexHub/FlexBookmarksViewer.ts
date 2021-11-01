import HubTitlebar from '@Components/hub/HubTitlebar';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import HubTitles from '@Resources/strings/HubTitles.json';

export default class FlexBookmarksViewer extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new HubTitlebar(HubTitles.BookmarksViewer).insertBackButton(
                    true,
                ),

                new Spacer(),

                ...flexarch.getBookmarks().map(bookmark =>
                    new ClickButton(
                        new HStack(
                            new TextView(bookmark.title),
                            new Spacer(),

                            new IonIcon('bookmark')
                                .whenMouseOver(ev => {
                                    // eslint-disable-next-line no-param-reassign
                                    (ev.view as IonIcon).name = 'trash-outline';
                                })
                                .whenMouseOut(ev => {
                                    // eslint-disable-next-line no-param-reassign
                                    (ev.view as IonIcon).name = 'bookmark';
                                }),
                        ).stretch(),
                    )
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
