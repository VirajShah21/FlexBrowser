import CanvasContext from './CanvasContext';
import SpriteGeometryFunction from './SpriteGeometryFunction';

export default class Sprite implements CanvasContext {
    public geometry: { func: SpriteGeometryFunction; args?: unknown[] }[];
    public x = 0;
    public y = 0;

    constructor() {
        this.geometry = [];
    }

    width(size: number): this {
        this.geometry.push({
            func: SpriteGeometryFunction.Width,
            args: [size],
        });
        return this;
    }

    height(size: number): this {
        this.geometry.push({
            func: SpriteGeometryFunction.Height,
            args: [size],
        });
        return this;
    }

    line(x1: number, y1: number, x2: number, y2: number): this {
        this.geometry.push({
            func: SpriteGeometryFunction.Line,
            args: [x1, y1, x2, y2],
        });
        return this;
    }

    stroke(): this {
        this.geometry.push({ func: SpriteGeometryFunction.Stroke });
        return this;
    }

    font(fontstr: string): this {
        this.geometry.push({ func: SpriteGeometryFunction.Font, args: [fontstr] });
        return this;
    }

    fillText(text: string, x: number, y: number): this {
        this.geometry.push({
            func: SpriteGeometryFunction.FillText,
            args: [text, x, y],
        });
        return this;
    }

    strokeText(text: string, x: number, y: number): this {
        this.geometry.push({
            func: SpriteGeometryFunction.StrokeText,
            args: [text, x, y],
        });
        return this;
    }

    fillStyle(style: string): this {
        this.geometry.push({
            func: SpriteGeometryFunction.FillStyle,
            args: [style],
        });
        return this;
    }

    fillRect(x1: number, y1: number, width: number, height: number): this {
        this.geometry.push({
            func: SpriteGeometryFunction.FillRect,
            args: [x1, y1, width, height],
        });
        return this;
    }

    setX(x: number): this {
        this.x = x;
        return this;
    }

    setY(y: number): this {
        this.y = y;
        return this;
    }
}
