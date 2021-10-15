import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import SearchEngineListBody from './SearchEngineListBody';
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

                new SearchEngineListBody(),
            ).padding(),
        );
    }
}
