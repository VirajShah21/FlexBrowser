import TextView from './TextView';

export default class TruncatedTextView extends TextView {
    private maxlen = 55;

    private original: string;

    constructor(text: string, maxlen = 15) {
        super(text);
        this.maxlen = maxlen;
        this.original = text;
        this.text = text;
    }

    public override set text(value: string) {
        this.original = value;
        if (value.length > this.maxlen) {
            this.body.textContent = `${value.substring(0, this.maxlen - 3)}...`;
        } else this.body.textContent = value;
    }

    public override get text(): string {
        return this.original;
    }
}
