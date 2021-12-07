import { HColor, rgb } from '@Hi/Colors';
import Checkbox from '@Hi/Components/Checkbox';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import InputField from '@Hi/Components/InputField';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import HumanEvent from '@Hi/Types/HumanEvent';
import View from '@Hi/View';
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
                new ClickButton(new IonIcon('remove-circle'))
                    .foreground(HColor(BrowserPreferences.ColorTheme))
                    .font('xl')
                    .padding(0),
                new ClickButton(new IonIcon('add-circle'))
                    .foreground(HColor(BrowserPreferences.ColorTheme))
                    .whenClicked(SearchEngineTable.addBlankCustomSearchEngine)
                    .margin({ left: 10 })
                    .font('xl')
                    .padding(0),

                new ClickButton(new TextView('Make Default'))
                    .background(HColor('blue'))
                    .foreground(rgb(255, 255, 255))
                    .rounded(5)
                    .margin({ left: 10 })
                    .whenClicked(SearchEngineTable.setDefaultSearchEngine),

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

    private static addBlankCustomSearchEngine(ev: HumanEvent<View>): void {
        (
            ev.view
                .root()
                .findViewById('search-engine-list-body') as SearchEngineListBody
        ).push({ id: '', name: '', urlPrefix: '' });
    }

    private static removeSelectedSearchEngines(): void {}

    private static setDefaultSearchEngine(ev: HumanEvent<View>): void {
        const items = ev.view
            .root()
            .findViewById('search-engine-list-body')!
            .getViewsByClass('search-engine-item');
        items.forEach(item => {
            if ((item.findViewById('engine-checkbox') as Checkbox).checked) {
                BrowserPreferences.DefaultSearchEngine =
                    SearchEngineListBody.getEngineId(
                        (item.findViewById('engine-name') as InputField).value,
                    );
            }
        });
    }
}
