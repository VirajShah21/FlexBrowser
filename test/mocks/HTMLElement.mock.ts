import CSSStyleDefinitionMock from './CSSStyleDefinition.mock';

type AttributeName = 'id' | 'name';

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

export function assertIsHTMLElementMock(
    val: unknown,
): asserts val is HTMLElement {
    if (typeof val === 'string') {
        throw new Error(`${val} is not an HTMLElement`);
    }

    if (typeof val === 'object') {
        if (
            !(
                Object.prototype.hasOwnProperty.call(val, 'tagName') &&
                Object.prototype.hasOwnProperty.call(val, 'style') &&
                Object.prototype.hasOwnProperty.call(val, 'classList') &&
                Object.prototype.hasOwnProperty.call(val, 'id') &&
                Object.prototype.hasOwnProperty.call(val, 'children')
            )
        ) {
            throw new Error(
                `${JSON.stringify(
                    val,
                    null,
                    4,
                )} is missing a property [tagName, style, classList, id, children]`,
            );
        }
    }
}

export function assertIsHTMLElementMockCollection(
    val: unknown,
): asserts val is HTMLElementMock[] {
    if (Object.prototype.isPrototypeOf.call(val, Array)) {
        (val as Array<unknown>).forEach(element =>
            assertIsHTMLElementMock(element),
        );
    }
}

export default class HTMLElementMock {
    public tagName: string;

    public classList: string[];

    private style: CSSStyleDefinitionMock;

    private children: (HTMLElementMock | string)[];

    private eventListeners: Record<string, (() => void)[]>;

    private attributes: {
        id: string;
        name: string;
        value: string;
    };

    public constructor(tagName: string) {
        this.tagName = tagName;
        this.style = new CSSStyleDefinitionMock();
        this.children = [];
        this.classList = [];
        this.attributes = {
            id: '',
            name: '',
            value: '',
        };
        this.eventListeners = {};
    }

    public querySelector(query: string): HTMLElementMock | null {
        return this.querySelectorAll(query)[0] || null;
    }

    public querySelectorAll(query: string): HTMLElementMock[] {
        const queryMap = queryFilterMap(tokenizeQuery(query));
        let direct = this.children;
        if (queryMap.tagname) {
            direct = direct.filter(
                el => typeof el !== 'string' && el.tagName === queryMap.tagname,
            );
        }

        if (queryMap.id) {
            direct.filter(
                el =>
                    typeof el !== 'string' && el.attributes.id === queryMap.id,
            );
        }

        if (queryMap.classnames) {
            queryMap.classnames.forEach(className => {
                direct = direct.filter(
                    el =>
                        typeof el !== 'string' &&
                        el.classList.indexOf(className) >= 0,
                );
            });
        }

        const childResults = this.children.flatMap(el => {
            if (typeof el !== 'string') return el.querySelectorAll(query);
            return undefined;
        });

        const out: HTMLElementMock[] = [];

        assertIsHTMLElementMockCollection(direct);
        assertIsHTMLElementMockCollection(childResults);

        direct.forEach(el => out.push(el));
        childResults.forEach(el => out.push(el));
        return out;
    }

    public append(...elements: (HTMLElementMock | 'string')[]): void {
        elements.forEach(el => this.children.push(el));
    }

    public appendChild(element: HTMLElementMock): void {
        this.children.push(element);
    }

    public setAttribute(attributeName: AttributeName, value: string): void {
        this.attributes[attributeName] = value;
    }

    public addEventListener(type: string, listener: () => void): void {
        if (Object.prototype.hasOwnProperty.call(this.eventListeners, type)) {
            this.eventListeners[type].push(listener);
        } else {
            this.eventListeners[type] = [listener];
        }
    }

    public mockClick(): void {
        if (
            Object.prototype.hasOwnProperty.call(this.eventListeners, 'click')
        ) {
            this.eventListeners.click.forEach(listener => listener());
        }
    }

    public mockInput(character: string): void {
        this.attributes.value += character;
        if (
            Object.prototype.hasOwnProperty.call(this.eventListeners, 'input')
        ) {
            this.eventListeners.input.forEach(listener => listener());
        }
    }

    public get className(): string {
        return this.classList.join(' ');
    }

    public set className(value: string) {
        this.classList = value.split(' ');
    }

    public get id(): string {
        return this.attributes.id;
    }

    public set id(value: string) {
        this.attributes.id = value;
    }

    public get name(): string {
        return this.attributes.name;
    }

    public set name(value: string) {
        this.attributes.name = value;
    }

    public get value(): string {
        return this.attributes.value;
    }

    public set value(newValue: string) {
        this.attributes.value = newValue;
    }
}
