import BrowserPreferences from '@UI/BrowserPreferences';

type ValidURLProtocol = 'https' | 'http';

export default class ValidURL {
    private value: string;

    constructor(value: string) {
        if (typeof value === 'string') this.value = value.trim();
    }

    private isURL(): boolean {
        if (this.value.includes(' ')) return false;
        return true;
    }

    public get protocol(): ValidURLProtocol {
        if (this.isURL()) {
            if (this.value.includes('://')) {
                const proto = this.value.substring(
                    0,
                    this.value.indexOf('://'),
                );
                if (proto === 'http' || proto === 'https') return proto;
                throw new Error(`No such protocol: ${proto}`);
            }
        }
        return 'https';
    }

    public get domain(): string {
        if (this.isURL()) {
            const { protocol } = this;
            let rest: string =
                this.value.indexOf(protocol) === 0
                    ? this.value.substring(protocol.length + 3)
                    : this.value;
            if (rest.includes('/')) rest = rest.substring(0, rest.indexOf('/'));
            return rest;
        }
        return 'google.com';
    }

    public get path(): string {
        if (this.isURL()) {
            const { protocol } = this;
            const rest: string =
                this.value.indexOf(protocol) === 0
                    ? this.value.substring(protocol.length + 3)
                    : this.value;
            if (rest.includes('/')) return rest.substring(rest.indexOf('/'));
            return '/';
        }
        return `/search?q=${this.value.split(' ').join('+')}`;
    }

    public toString(): string {
        if (this.isURL()) {
            return `${this.protocol}://${this.domain}${this.path}`;
        }

        return `${BrowserPreferences.defaultSearchEngine.urlPrefix}${this.value
            .split(' ')
            .join('+')}`;
    }
}
