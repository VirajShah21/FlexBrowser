import IonIcon from '@Hi/Components/IonIcon';
import { HumanEvent, ViewController } from '@Hi/ViewController';

export function navigateToHubMainPage(): void {
    ViewController.getController('AppController')?.navigateTo('hub');
}

export function toggleBookmarkButtonClicked(
    ev: HumanEvent,
    urlMeta: URLMeta,
): void {
    const bookmarkIcon = (ev.view.children[0] as IonIcon)
        .body as HTMLInputElement;
    if (ev.view.description === 'bookmark') {
        flexarch.addBookmark(urlMeta);
        bookmarkIcon.name = 'bookmark';
        ev.view.describe('unbookmark');
    } else if (ev.view.description === 'unbookmark') {
        // TODO: Enable removeBookmark()
        // flexarch.removeBookmark(urlMeta);
        bookmarkIcon.name = 'bookmark-outline';
        ev.view.describe('bookmark');
    }
}
