export default abstract class Thread {
    private static registry: Thread[];

    private id: number;

    private timer: number;

    public constructor() {
        Thread.registry.push(this);
        this.id = Thread.registry.length;
    }

    public abstract run(): void;

    public start(): void {
        this.timer = window.setTimeout(() => this.run(), 1);
    }
}
