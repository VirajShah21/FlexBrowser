import IonIcon from '@Hi/Components/IonIcon';
import HumanEvent from '@Hi/Types/HumanEvent';
import BookmarksManager from '@Models/BookmarksManager';
import ValidURL from '@Models/ValidURL';
import ThemedButton from './TaskbarButtons/ThemedButton';

export default class BookmarkButton extends ThemedButton {
    private icon: IonIcon;

    constructor(meta: URLMeta) {
        super(
            new IonIcon(
                BookmarksManager.isBookmarked(new ValidURL(meta.url))
                    ? 'bookmark'
                    : 'bookmark-outline',
            ).addClass('BookmarkButton-icon'),
        );

        this.whenClicked(ev => BookmarkButton.onClick(ev, meta));
    }

    private static onClick(ev: HumanEvent<ThemedButton>, meta: URLMeta): void {
        ev.browserEvent.stopPropagation();
        const icon = ev.view.getViewsByClass(
            'BookmarkButton-icon',
        )[0] as IonIcon;

        if (BookmarksManager.isBookmarked(new ValidURL(meta.url))) {
            BookmarksManager.removeBookmark(new ValidURL(meta.url));
            icon.name = 'bookmark-outline';
        } else {
            const validMeta = { ...meta };
            validMeta.url = new ValidURL(meta.url).toString();
            BookmarksManager.addBookmark(meta);
            icon.name = 'bookmark';
        }
    }
}
