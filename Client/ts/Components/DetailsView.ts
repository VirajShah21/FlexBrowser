import View from '@Hi/View';

export default class DetailsView extends View {
    constructor(summary: DetailsSummaryView, ...details: View[]) {
        super('details', summary, ...details);
    }
}

export class DetailsSummaryView extends View {
    constructor(...children: View[]) {
        super('summary', ...children);
    }

    public textStart(): this {
        this.body.style.textAlign = 'start';
        return this;
    }
}
