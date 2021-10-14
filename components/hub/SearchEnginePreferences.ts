import { HColor } from '@Hi/Colors';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import SearchEngineItem from './SearchEngineItem';
import SearchEngineListHead from './SearchEngineListHead';

export default class SearchEnginePreference extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new HStack(
                    new TextView('Search Engine Preferences')
                        .font('md')
                        .bold()
                        .margin({ bottom: 10 }),
                    new Spacer(),
                ).width('100%'),

                new SearchEngineListHead(),

                new ScrollView(
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
                )
                    .width('100%')
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
                    }),
            ).padding(),
        );
    }
}
