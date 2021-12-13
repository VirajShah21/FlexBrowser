export default class ClientLogger {
    public static info(message: string): void {
        flexarch.log(0, message);
    }

    public static warn(message: string): void {
        flexarch.log(1, message);
    }

    public static error(message: string): void {
        flexarch.log(2, message);
    }

    public static debug(message: string): void {
        flexarch.log(3, message);
    }
}
