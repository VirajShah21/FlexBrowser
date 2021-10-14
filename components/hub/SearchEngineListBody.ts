import { HColor } from '@Hi/Colors';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import VStack from '@Hi/Components/VStack';
import SearchEngineItem from './SearchEngineItem';

export default class SearchEngineListBody extends ScrollView {
    constructor() {
        super(
            new VStack(
                new SearchEngineItem(
                    'Google Search',
                    'https://google.com/search?q=',
                    true,
                ),
                new SearchEngineItem(
                    'Duck Duck Go',
                    'https://duckduckgo.com/q=',
                ),
                new SearchEngineItem('Bing', 'https://bing.com/s='),
                new Spacer(),
            ).stretch(),
        );

        this.width('100%')
            .height('100px')
            .border({
                size: 1,
                style: 'solid',
                color: HColor('background'),
            })
            .borderTop({ size: 0 })
            .rounded({
                bottom: {
                    left: 5,
                    right: 5,
                },
            });
    }
}
