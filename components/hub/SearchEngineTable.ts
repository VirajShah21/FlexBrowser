import { HColor, rgb } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import BrowserPreferences from '@Models/BrowserPreferences';
import {
    addBlankCustomSearchEngine,
    setDefaultSearchEngine,
} from '@Triggers/custom-search-triggers';
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
                new ClickButton(new IonIcon('remove-circle'))
                    .foreground(HColor(BrowserPreferences.ColorTheme))
                    .font('xl')
                    .padding(0),
                new ClickButton(new IonIcon('add-circle'))
                    .foreground(HColor(BrowserPreferences.ColorTheme))
                    .whenClicked(addBlankCustomSearchEngine)
                    .margin({ left: 10 })
                    .font('xl')
                    .padding(0),

                new ClickButton(new TextView('Make Default'))
                    .background(HColor('blue'))
                    .foreground(rgb(255, 255, 255))
                    .rounded(5)
                    .margin({ left: 10 })
                    .whenClicked(setDefaultSearchEngine),

                new Spacer(),

                new TextView(
                    `Default Search Engine: ${
                        BrowserPreferences.getDefaultCustomerSearchEngine().name
                    }`,
                ).font('sm'),
            )
                .width('100%')
                .margin({ top: 10 }),
        );
        this.padding().width('100%');
    }
}
