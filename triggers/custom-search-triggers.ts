import SearchEngineListBody from '@Components/hub/SearchEngineListBody';
import Checkbox from '@Hi/Components/Checkbox';
import InputField from '@Hi/Components/InputField';
import HumanEvent from '@Hi/Types/HumanEvent';
import BrowserPreferences from '@UI/BrowserPreferences';

export function addBlankCustomSearchEngine(ev: HumanEvent): void {
    (
        ev.view
            .root()
            .findViewById('search-engine-list-body') as SearchEngineListBody
    ).push({ id: '', name: '', urlPrefix: '' });
}

export function removeSelectedSearchEngines(): void {}

export function setDefaultSearchEngine(ev: HumanEvent): void {
    const items = ev.view
        .root()
        .findViewById('search-engine-list-body')!
        .getViewsByClass('search-engine-item');
    items.forEach(item => {
        if ((item.findViewById('engine-checkbox') as Checkbox).checked) {
            BrowserPreferences.defaultSearchEngine =
                SearchEngineListBody.getEngineId(
                    (item.findViewById('engine-name') as InputField).value,
                );
        }
    });
}
