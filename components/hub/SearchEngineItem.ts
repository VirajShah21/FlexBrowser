import Checkbox from '@Hi/Components/Checkbox';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';

class SearchEngineTextCell extends TextField {
    public constructor(placeholder: string, value: string) {
        super(placeholder);
        this.value = value;
        this.border({ size: 0 }).font('sm').background('none');
    }
}

export default class SearchEngineItem extends HStack {
    public constructor(name: string, urlPrefix: string, isDefault = false) {
        super(
            new Spacer(),
            new Checkbox(isDefault).font('md'),
            new Spacer(),
            new SearchEngineTextCell('eg: Google, Bing, Yahoo', name)
                .width('calc((100% - 50px) / 2')
                .textStart(),
            new SearchEngineTextCell('eg: google.com/search?q=', urlPrefix)
                .width('calc((100% - 50px) / 2')
                .textStart(),
        );

        this.width('100%').font('sm').padding({ top: 3, bottom: 3 });
    }
}
