import SearchEngineListBody from '@Components/hub/SearchEngineListBody';
import HumanEvent from '@Hi/Types/HumanEvent';

export function addBlankCustomSearchEngine(ev: HumanEvent): void {
    (
        ev.view
            .root()
            .findViewById('search-engine-list-body') as SearchEngineListBody
    ).push({ id: '', name: '', urlPrefix: '' });
}

export function removeSelectedSearchEngines(): void {}
