import { HColor, rgb } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView, { FontWeight } from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import {
    addBlankCustomSearchEngine,
    setDefaultSearchEngine,
} from '@Triggers/custom-search-triggers';
import BrowserPreferences from '@Models/BrowserPreferences';
import SearchEngineListBody from './SearchEngineListBody';
import SearchEngineListHead from './SearchEngineListHead';

export default class SearchEngineTable extends VStack {
    constructor() {
        super(
            new HStack(
                new TextView('Search Engine Preferences')
                    .font('md')
                    .bold()
                    .margin({ bottom: 10 }),
                new Spacer(),
            ).width('100%'),

            new SearchEngineListHead(),

            new SearchEngineListBody(),

            new HStack(
                new ClickButton(new TextView('-').weight(FontWeight.Bold))
                    .background(HColor('gray3'))
                    .foreground(HColor('foreground'))
                    .borderRight({
                        size: 1,
                        style: 'solid',
                        color: HColor('gray4'),
                    })
                    .rounded(0)
                    .rounded({
                        top: { left: 5 },
                        bottom: { left: 5 },
                    }),
                new ClickButton(new TextView('+').weight(FontWeight.Bold))
                    .background(HColor('gray3'))
                    .foreground(HColor('foreground'))
                    .rounded(0)
                    .rounded({
                        top: { right: 5 },
                        bottom: { right: 5 },
                    })
                    .whenClicked(addBlankCustomSearchEngine),
                new ClickButton(new TextView('Make Default'))
                    .background(HColor('blue'))
                    .foreground(rgb(255, 255, 255))
                    .rounded(5)
                    .margin({ left: 10 })
                    .whenClicked(setDefaultSearchEngine),
                new Spacer(),
                new TextView(
                    `Default Search Engine: ${BrowserPreferences.defaultSearchEngine.name}`,
                ).font('sm'),
            )
                .width('100%')
                .margin({ top: 10 }),
        );
        this.padding().width('100%');
    }
}
