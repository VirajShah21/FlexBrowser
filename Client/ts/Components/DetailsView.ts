import View from '@Hi/View';

export default class DetailsView extends View<HTMLDetailsElement> {
    constructor(summary: DetailsSummaryView, ...details: View<HTMLElement>[]) {
        super('details', summary, ...details);
    }
}

export class DetailsSummaryView extends View<HTMLDivElement> {
    constructor(...children: View<HTMLElement>[]) {
        super('summary', ...children);
    }

    public textStart(): this {
        this.body.style.textAlign = 'start';
        return this;
    }
}
