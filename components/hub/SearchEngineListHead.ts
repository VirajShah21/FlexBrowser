import { HColor, rgb } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import TextView, { FontWeight } from '@Hi/Components/TextView';

export default class SearchEngineListHead extends HStack {
    constructor() {
        super(
            new TextView('').width('50px').textStart(),
            new TextView('Name')
                .width('calc((100% - 50px) / 2)')
                .textStart()
                .weight(FontWeight.Bold),
            new TextView('URL Prefix')
                .width('calc((100% - 50px) / 2)')
                .textStart()
                .weight(FontWeight.Bold),
        );

        this.width('100%')
            .background(HColor('gray'))
            .foreground(rgb(0, 0, 0))
            .rounded({ top: { left: 5, right: 5 } })
            .padding(5)
            .font('sm');
    }
}
