import Checkbox from '@Hi/Components/Checkbox';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';

export default class SearchEngineItem extends HStack {
    public constructor() {
        super(
            new Spacer(),
            new Checkbox().font('md'),
            new Spacer(),
            new TextView('Google').width('calc((100% - 50px) / 2').textStart(),
            new TextView('https://google.com/search?q=')
                .width('calc((100% - 50px) / 2')
                .textStart(),
        );

        this.width('100%').font('sm');
    }
}
