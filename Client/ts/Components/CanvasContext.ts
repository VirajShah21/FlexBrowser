export default interface CanvasContext {
    width: (size: number) => this;
    height: (size: number) => this;
    line: (x1: number, y1: number, x2: number, y2: number) => this;
    stroke: () => this;
    font: (fontstr: string) => this;
    fillText: (text: string, x: number, y: number) => this;
    strokeText: (text: string, x: number, y: number) => this;
    fillStyle: (style: string) => this;
    fillRect: (x1: number, y1: number, width: number, height: number) => this;
}
