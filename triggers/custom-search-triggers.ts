import SearchEngineListBody from '@Components/hub/SearchEngineListBody';
import Checkbox from '@Hi/Components/Checkbox';
import InputField from '@Hi/Components/InputField';
import HumanEvent from '@Hi/Types/HumanEvent';
import View from '@Hi/View';
import BrowserPreferences from '@Models/BrowserPreferences';

export function addBlankCustomSearchEngine(ev: HumanEvent<View>): void {
    (
        ev.view
            .root()
            .findViewById('search-engine-list-body') as SearchEngineListBody
    ).push({ id: '', name: '', urlPrefix: '' });
}

export function removeSelectedSearchEngines(): void {}

export function setDefaultSearchEngine(ev: HumanEvent<View>): void {
    const items = ev.view
        .root()
        .findViewById('search-engine-list-body')!
        .getViewsByClass('search-engine-item');
    items.forEach(item => {
        if ((item.findViewById('engine-checkbox') as Checkbox).checked) {
            BrowserPreferences.DefaultSearchEngine =
                SearchEngineListBody.getEngineId(
                    (item.findViewById('engine-name') as InputField).value,
                );
        }
    });
}
