import Favicon from '@Components/Favicon';
import ThemedButton from '@Components/TaskbarButtons/ThemedButton';
import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import RGBAModel from '@Hi/RGBAModel';
import BookmarksManager from '@Models/BookmarksManager';
import BrowserPreferences from '@Models/BrowserPreferences';
import ValidURL from '@Models/ValidURL';

export default class FlexBookmarkItem extends ThemedButton {
    public constructor(bookmark: URLMeta) {
        super(
            new HStack(
                new Favicon(new ValidURL(bookmark.url))
                    .margin({ right: 10 })
                    .width(24)
                    .height(24)
                    .whenAnalyzed(ev => {
                        const thisFavicon = ev.view as Favicon;
                        const avgRGB = thisFavicon.averageColor;
                        const bookmarkItem = thisFavicon.root(view =>
                            view.getClassList().includes('bookmark-item'),
                        );
                        const bookmarkButtonIcon =
                            bookmarkItem.findViewById<IonIcon>(
                                'bookmark-icon',
                            )!;
                        const newColor = RGBAModel.copy(avgRGB);

                        if (
                            thisFavicon.isLight &&
                            BrowserPreferences.theme === 'light'
                        ) {
                            newColor
                                .red(avgRGB.r - 100)
                                .green(avgRGB.g - 100)
                                .blue(avgRGB.b - 100);
                        } else if (
                            !thisFavicon.isLight &&
                            BrowserPreferences.theme === 'dark'
                        ) {
                            newColor
                                .red(avgRGB.r + 100)
                                .green(avgRGB.g + 100)
                                .blue(avgRGB.b + 100);
                        }

                        bookmarkItem
                            .foreground(newColor)
                            .background(HColor('background'));

                        bookmarkButtonIcon.foreground(newColor);
                    }),

                new TextView(bookmark.title),

                new Spacer(),

                new ThemedButton(
                    new IonIcon('bookmark')
                        .whenMouseOver(ev => {
                            // eslint-disable-next-line no-param-reassign
                            (ev.view as IonIcon).name = 'trash-outline';
                        })
                        .whenMouseOut(ev => {
                            // eslint-disable-next-line no-param-reassign
                            (ev.view as IonIcon).name = 'bookmark';
                        })
                        .id('bookmark-icon'),
                ).whenClicked(() => {
                    BookmarksManager.removeBookmark(new ValidURL(bookmark.url));
                }),
            ).stretch(),
        );

        this.width('100%')
            .padding(5)
            .rounded()
            .margin({ top: 10 })
            .addClass('bookmark-item')
            .border({ size: 1, style: 'solid', color: HColor('gray5') });
    }
}
