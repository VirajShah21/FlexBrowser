import { RGBAModel } from '@Hi/Colors';
import { HISizingValue, sizing } from '@Hi/Types/sizing';

type TransitionStyleKey = 'background' | 'foreground' | 'opacity';
type TransitionFrameKey = 'from' | 'to' | '10%' | '25%' | '50%' | '75%' | '90%';

export default interface Transition {
    from?: TransitionStyle;
    to?: TransitionStyle;
    '10%'?: TransitionStyle;
    '25%'?: TransitionStyle;
    '50%'?: TransitionStyle;
    '75%'?: TransitionStyle;
    '90%'?: TransitionStyle;
    iterations: number;
    duration: number;
    delay?: number;
    direction?: 'normal' | 'reverse' | 'alternate' | 'aternate-reverse';
    after?: 'none' | 'forwards' | 'backwards' | 'both';
}

export interface TransitionStyle {
    background?: RGBAModel;
    foreground?: RGBAModel;
    opacity?: number;
    height?: HISizingValue;
    width?: HISizingValue;
}

const definedTransitions: Record<string, Transition> = {};

export function defineTransition(transition: Transition): string {
    const name = generateKeyframeName();
    let el = document.head.querySelector('style#himvc-keyframe-defs');
    console.log(el);
    if (el == null) {
        el = document.createElement('style');
        el.id = 'himvc-keyframe-defs';
        document.head.append(el);
        console.log(el);
    }
    el.innerHTML += `@keyframes ${name} { ${generateKeyframeCSS(transition)} }`;
    console.log(el);
    definedTransitions[name] = transition;
    return name;
}

export function getTransitionDefintion(name: string): Transition | null {
    return definedTransitions[name] || null;
}

function generateKeyframeCSS(transition: Transition): string {
    let out = '';
    for (let key in transition)
        if (
            ['iterations', 'duration', 'delay', 'direction', 'after'].indexOf(
                key,
            ) < 0
        )
            out += `${key} { ${generateCSSProperties(
                transition[key as TransitionFrameKey] as TransitionStyle,
            )} }`;
    return out;
}

function generateCSSProperties(properties: TransitionStyle): string {
    let out = '';
    for (let property in properties)
        out += `${generateCSSProperty(
            property,
            properties[property as TransitionStyleKey],
        )};`;
    return out;
}

function generateCSSProperty(property: string, value: unknown): string {
    switch (property) {
        case 'background':
            return `background: ${(value as RGBAModel).toString()}`;
        case 'foreground':
            return `color: ${(value as RGBAModel).toString()}`;
        case 'opacity':
            return `opacity: ${value}`;
        case 'height':
            return `height: ${sizing(value as HISizingValue)}`;
        case 'width':
            return `width: ${sizing(value as HISizingValue)}`;
        default:
            return '';
    }
}

function generateKeyframeName(): string {
    const tokens =
        '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    return (
        'himvct' +
        [0, 0, 0, 0, 0]
            .map(() => tokens[Math.floor(Math.random() * tokens.length)])
            .join('')
    );
}
