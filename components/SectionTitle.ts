import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';

export default class SectionTitle extends HStack {
    constructor(title: string) {
        super(new TextView(title).font('xl').bold(), new Spacer());
        this.width('100%');
    }
}
