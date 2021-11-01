import SearchEngineTable from '@Components/hub/SearchEngineTable';
import BaseHubWindow from './BaseHubWindow';

export default class SearchEnginePreferences extends BaseHubWindow {
    constructor() {
        super('Search Engines', new SearchEngineTable());
    }
}
