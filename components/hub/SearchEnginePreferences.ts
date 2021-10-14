import { HColor } from '@Hi/Colors';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import SearchEngineItem from './SearchEngineItem';

export default class SearchEnginePreference extends HIFullScreenView {
    private searchEngineList: {
        isDefault: boolean;
        name: string;
        urlPrefix: string;
    }[];

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

                new HStack(
                    new TextView('').width('50px').textStart(),
                    new TextView('Name')
                        .width('calc((100% - 50px) / 2)')
                        .textStart(),
                    new TextView('URL Prefix')
                        .width('calc((100% - 50px) / 2)')
                        .textStart(),
                )
                    .width('100%')
                    .background(HColor('background'))
                    .rounded({ top: { left: 5, right: 5 } })
                    .padding(5)
                    .font('sm'),

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
