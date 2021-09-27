function tokenizeQuery(query: string): { type: string; value: string }[] {
    const out: { type: string; value: string }[] = [];
    const { length } = query;

    if (query.charAt(0) !== '.' && query.charAt(0) !== '#') {
        const classStart = query.indexOf('.');
        const idStart = query.indexOf('#');
        const stop = Math.min(
            classStart > 0 ? classStart : length,
            idStart > 0 ? idStart : length,
        );
        out.push({ type: 'tagname', value: query.substring(0, stop) });
    }

    const start = out.length > 0 ? out[0]?.value.length || 0 : 0;
    const curr: { type: string; value: string } = { type: '', value: '' };

    for (let i = start; i < length; i += 1) {
        if (
            (query.charAt(i) === '.' || query.charAt(i) === '#') &&
            i !== start
        ) {
            out.push(curr);
            if (query.charAt(i) === '.') curr.type = 'classname';
            else curr.type = 'id';
            curr.value = '';
        } else {
            curr.value += query.charAt(i);
        }
    }

    return out;
}

function queryFilterMap(tokenizedQuery: { type: string; value: string }[]): {
    tagname?: string;
    id?: string;
    classnames?: string[];
} {
    return {
        tagname: tokenizedQuery.find(query => query.type === 'tagname')?.value,
        id: tokenizedQuery.find(query => query.type === 'id')?.value,
        classnames: tokenizedQuery
            .filter(query => query.type === 'classname')
            .map(query => query.value),
    };
}

export default class HTMLElementMock {
    public tagName: string;

    public style: Record<string, string>;

    public classList: string[];

    public id: string;

    private children: HTMLElementMock[];

    public constructor(tagName: string) {
        this.tagName = tagName;
        this.style = {};
        this.id = '';
    }

    public querySelector(query: string): HTMLElementMock | null {
        return this.querySelectorAll(query)[0] || null;
    }

    public querySelectorAll(query: string): HTMLElementMock[] {
        const queryMap = queryFilterMap(tokenizeQuery(query));
        let direct = this.children;
        direct = queryMap.tagname
            ? direct.filter(el => el.tagName === queryMap.tagname)
            : direct;
        direct = queryMap.id
            ? direct.filter(el => el.id === queryMap.id)
            : direct;
        if (queryMap.classnames) {
            queryMap.classnames.forEach(className => {
                direct = direct.filter(
                    el => el.classList.indexOf(className) >= 0,
                );
            });
        }
        const childResults = this.children.flatMap(el =>
            el.querySelectorAll(query),
        );
        const out: HTMLElementMock[] = [];
        direct.forEach(el => out.push(el));
        childResults.forEach(el => out.push(el));
        return out;
    }

    public get className(): string {
        return this.classList.join(' ');
    }

    public set className(value: string) {
        this.classList = value.split(' ');
    }
}
