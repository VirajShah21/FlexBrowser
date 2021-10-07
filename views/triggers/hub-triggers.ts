import IonIcon from '@Hi/Components/IonIcon';
import { HumanEvent, ViewController } from '@Hi/ViewController';

export function navigateBack(): void {
    ViewController.getController('AppController')?.navigateBack();
}

export function toggleBookmarkButtonClicked(
    ev: HumanEvent,
    urlMeta: URLMeta,
): void {
    const bookmarkIcon = (ev.view.children[0] as IonIcon)
        .body as HTMLInputElement;
    if (ev.view.description !== 'unbookmark') {
        flexarch.addBookmark(urlMeta);
        bookmarkIcon.name = 'bookmark';
        ev.view.describe('unbookmark');
    } else {
        // TODO: Enable removeBookmark()
        // flexarch.removeBookmark(urlMeta);
        bookmarkIcon.name = 'bookmark-outline';
        ev.view.describe('bookmark');
    }
}
