import { HColor } from '@Hi/Colors';
import ScrollView from '@Hi/Components/ScrollView';
import TextField from '@Hi/Components/TextField';
import VStack from '@Hi/Components/VStack';
import BrowserPreferences from '@UI/BrowserPreferences';
import SearchEngineItem from './SearchEngineItem';

export default class SearchEngineListBody extends ScrollView {
    // Required for `SearchEngineItem` to find this root view
    public readonly isSearchEngineListBody = true;

    private searchEngineList: CustomSearchEngine[] =
        BrowserPreferences.searchEngines;

    constructor() {
        super(new VStack().id('search-engine-list').stretch().alignStart());

        this.width('100%')
            .height({ min: 100, default: 100 })
            .border({
                size: 1,
                style: 'solid',
                color: HColor('gray'),
            })
            .borderTop({ size: 0 })
            .rounded({
                bottom: {
                    left: 5,
                    right: 5,
                },
            })
            .resizable('v')
            .id('search-engine-list-body');

        this.updateList();
    }

    public push(item: CustomSearchEngine): void {
        this.searchEngineList.push(item);
        this.updateList();
    }

    private updateList() {
        const list = this.searchEngineList;
        this.findViewById('search-engine-list')!
            .removeAllChildren()
            .addChildren(
                ...list.map(
                    item => new SearchEngineItem(item.name, item.urlPrefix),
                ),
            );
        this.findViewById('search-engine-list')!.forChild((child, index) => {
            child.background(
                index % 2 ? HColor('background') : HColor('gray5'),
            );
        });
    }

    public override handle(data: string): void {
        if (data === 'updateSearchEngineList') {
            const list: CustomSearchEngine[] = [];
            this.findViewById('search-engine-list')
                ?.getViewsByClass('search-engine-item')
                .forEach(item => {
                    const name = (item.findViewById('engine-name') as TextField)
                        .value;

                    list.push({
                        name,
                        urlPrefix: (
                            item.findViewById('engine-prefix') as TextField
                        ).value,
                        id: SearchEngineListBody.getEngineId(name),
                    });
                });

            this.searchEngineList = list;

            flexarch.pref('searchEngines', list);
        }
    }

    private static getEngineId(name: string): string {
        let tmp = name.trim().toLowerCase();
        while (tmp.includes(' ')) tmp = tmp.replace(' ', '-');
        return tmp;
    }
}
