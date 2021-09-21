import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';

export default class FlexBookmarksViewer extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                ...flexarch
                    .getBookmarks()
                    .map(
                        bookmark =>
                            new ClickButton(new TextView(bookmark.title)),
                    ),
            ).stretch(),
        );
    }
}
