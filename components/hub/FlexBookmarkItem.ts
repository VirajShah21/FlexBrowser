import Favicon from '@Components/Favicon';
import ThemedButton from '@Components/ThemedButton';
import { getAverageRGB, HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import BookmarksManager from '@Models/BookmarksManager';
import ValidURL from '@Models/ValidURL';

export default class FlexBookmarkItem extends ThemedButton {
    public constructor(bookmark: URLMeta) {
        super(
            new HStack(
                new Favicon(new ValidURL(bookmark.url))
                    .margin({ right: 10 })
                    .width(24)
                    .height(24)
                    .whenLoaded(ev => {
                        const thisFavicon = ev.view as Favicon;
                        const avgRGB = getAverageRGB(thisFavicon.body);

                        thisFavicon
                            .root(view =>
                                view.getClassList().includes('bookmark-item'),
                            )
                            .border({
                                size: 1,
                                style: 'solid',
                                color: avgRGB,
                            })
                            .foreground(avgRGB)
                            .background(HColor('background'));
                    }),
                new TextView(bookmark.title),
                new Spacer(),

                new ClickButton(
                    new IonIcon('bookmark')
                        .whenMouseOver(ev => {
                            // eslint-disable-next-line no-param-reassign
                            (ev.view as IonIcon).name = 'trash-outline';
                        })
                        .whenMouseOut(ev => {
                            // eslint-disable-next-line no-param-reassign
                            (ev.view as IonIcon).name = 'bookmark';
                        }),
                ).whenClicked(() => {
                    BookmarksManager.removeBookmark(new ValidURL(bookmark.url));
                }),
            ).stretch(),
        );

        this.width('100%')
            .padding(5)
            .rounded()
            .margin({ bottom: 10 })
            .addClass('bookmark-item');
    }
}
