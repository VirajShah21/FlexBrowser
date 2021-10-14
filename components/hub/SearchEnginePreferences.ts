import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';

export default class SearchEnginePreference extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new HStack(
                    new TextView('Theme')
                        .font('md')
                        .bold()
                        .margin({ bottom: 10 }),
                    new Spacer(),
                ).width('100%'),

                new HStack(
                    new TextView('Default'),
                    new TextView('Name'),
                    new TextView('URL Prefix'),
                ),

                new ScrollView(new TextView('Item 1'), new TextView('Item 2')),
            ),
        );
    }
}
