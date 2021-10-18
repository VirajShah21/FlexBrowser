import { HColor } from '@Hi/Colors';
import ScrollView from '@Hi/Components/ScrollView';
import VStack from '@Hi/Components/VStack';
import SearchEngineItem from './SearchEngineItem';

export default class SearchEngineListBody extends ScrollView {
    public readonly isSearchEngineListBody = true;

    private searchEngineList: {
        name: string;
        urlPrefix: string;
    }[] = [
        {
            name: 'Google Search',
            urlPrefix: 'https://google.com/search?q=',
        },
        {
            name: 'Duck Duck Go',
            urlPrefix: 'https://duckduckgo.com/q=',
        },
        {
            name: 'Bing',
            urlPrefix: 'https://duckduckgo.com/q=',
        },
    ];

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

        this.findViewById('search-engine-list')!.forChild((child, index) => {
            child.background(
                index % 2 ? HColor('background') : HColor('gray5'),
            );
        });
    }

    public push(item: {
        isDefault?: boolean;
        name: string;
        urlPrefix: string;
    }): void {
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
    }
}
