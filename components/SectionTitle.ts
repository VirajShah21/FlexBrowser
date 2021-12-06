import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';

/**
 * The title for sections. (Usually for the Hub).
 *
 * @export
 * @class SectionTitle
 * @extends {HStack}
 */
export default class SectionTitle extends HStack {
    /**
     * Creates an instance of SectionTitle.
     * @param {string} title The text to display.
     *
     * @memberOf SectionTitle
     */
    constructor(title: string) {
        super(new TextView(title).font('xl').bold(), new Spacer());
        this.width('100%');
    }
}
