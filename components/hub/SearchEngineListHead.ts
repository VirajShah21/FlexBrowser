import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import TextView from '@Hi/Components/TextView';

export default class SearchEngineListHead extends HStack {
    constructor() {
        super(
            new TextView('').width('50px').textStart(),
            new TextView('Name').width('calc((100% - 50px) / 2)').textStart(),
            new TextView('URL Prefix')
                .width('calc((100% - 50px) / 2)')
                .textStart(),
        );

        this.width('100%')
            .background(HColor('background'))
            .rounded({ top: { left: 5, right: 5 } })
            .padding(5)
            .font('sm');
    }
}
