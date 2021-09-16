import { StateObject, StateProxy } from '@Hi/Types/states';
import View from '@Hi/View';
import TextView from './TextView';

export default class DetailsSummaryView extends View {
    public state: StateProxy<{ text: string }>;

    constructor(summaryText: string) {
        super('summary', new TextView(summaryText).id('summary-text'));
        this.state = StateObject({ text: summaryText }, () => {
            (this.getViewById('summary-text') as TextView).model.text =
                this.state.text;
        });
    }
}
