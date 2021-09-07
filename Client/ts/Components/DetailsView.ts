import View from '@Hi/View';
import DetailsSummaryView from './DetailsSummaryView';

export default class DetailsView extends View {
    constructor(summary: DetailsSummaryView, ...details: View[]) {
        super('details', summary, ...details);
    }
}
