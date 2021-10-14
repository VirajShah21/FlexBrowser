import Checkbox from '@Hi/Components/Checkbox';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';

export default class SearchEngineItem extends HStack {
    public constructor(name: string, urlPrefix: string, isDefault = false) {
        super(
            new Spacer(),
            new Checkbox(isDefault).font('md'),
            new Spacer(),
            new TextView(name).width('calc((100% - 50px) / 2').textStart(),
            new TextView(urlPrefix).width('calc((100% - 50px) / 2').textStart(),
        );

        this.width('100%').font('sm').padding({ top: 3, bottom: 3 });
    }
}
