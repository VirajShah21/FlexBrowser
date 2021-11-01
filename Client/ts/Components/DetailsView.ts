import View from '@Hi/View';

export class DetailsSummaryView extends View {
    constructor(...children: View[]) {
        super('summary', ...children);
    }
}
export default class DetailsView extends View {
    constructor(summary: DetailsSummaryView, ...details: View[]) {
        super('details', summary, ...details);
    }
}
