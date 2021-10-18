import Checkbox from '@Hi/Components/Checkbox';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';

class SearchEngineTextCell extends TextField {
    public constructor(placeholder: string, value: string) {
        super(placeholder);
        this.value = value;
        this.border({ size: 0 })
            .font('sm')
            .background('none')
            .whenChanged(ev => {
                ev.view
                    .root(view =>
                        Object.prototype.hasOwnProperty.call(
                            view,
                            'isSearchEngineListBody',
                        ),
                    )
                    .signal('updateSearchEngineList');
            });
    }
}

export default class SearchEngineItem extends HStack {
    public constructor(name: string, urlPrefix: string) {
        super(
            new Spacer(),
            new Checkbox().font('md').id('engine-checkbox'),
            new Spacer(),
            new SearchEngineTextCell('eg: Google, Bing, Yahoo', name)
                .width('calc((100% - 50px) / 2')
                .textStart()
                .id('engine-name'),
            new SearchEngineTextCell('eg: google.com/search?q=', urlPrefix)
                .width('calc((100% - 50px) / 2')
                .textStart()
                .id('engine-prefix'),
        );

        this.width('100%')
            .font('sm')
            .padding({ top: 2, bottom: 2 })
            .addClass('search-engine-item');
    }
}
