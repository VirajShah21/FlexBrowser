import { HColor } from '@Hi/Colors';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import SearchEngineItem from './SearchEngineItem';

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
                    new VStack(new SearchEngineItem(), new Spacer()).stretch(),
                )
                    .width('100%')
                    .height('100px'),
            ).padding(),
        );
    }
}
