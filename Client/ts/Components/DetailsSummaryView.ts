import View from '@Hi/View';
import TextView from './TextView';

export default class DetailsSummaryView extends View {
    private textView: TextView;

    constructor(summaryText: string) {
        super('summary', new TextView(summaryText).id('summary-text'));
        this.textView = this.findViewById('summary-text') as TextView;
    }

    public get text(): string {
        return this.textView.text;
    }

    public set text(val: string) {
        this.textView.text = val;
    }
}
