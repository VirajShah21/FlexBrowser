import { HColor } from '@Hi/Colors';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import VStack from '@Hi/Components/VStack';
import SearchEngineItem from './SearchEngineItem';

export default class SearchEngineListBody extends ScrollView {
    private searchEngineList: {
        isDefault?: boolean;
        name: string;
        urlPrefix: string;
    }[] = [
        {
            name: 'Google Search',
            urlPrefix: 'https://google.com/search?q=',
            isDefault: true,
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
        super(new VStack().id('search-engine-list').stretch());

        this.width('100%')
            .height('100px')
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
            });

        this.updateList();

        this.findViewById('search-engine-list')!.forChild((child, index) => {
            child.background(
                index % 2 ? HColor('background') : HColor('gray5'),
            );
        });
    }

    private updateList() {
        const list = this.searchEngineList;
        this.findViewById('search-engine-list')!
            .removeAllChildren()
            .addChildren(
                ...list.map(
                    item =>
                        new SearchEngineItem(
                            item.name,
                            item.urlPrefix,
                            item.isDefault || false,
                        ),
                ),
                new Spacer(),
            );
    }
}
