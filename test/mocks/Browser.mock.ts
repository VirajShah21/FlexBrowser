import LocalStorageMock from './LocalStorage.mock';
import FlexArch from './flexarch.mock';
import { JSDOM } from 'jsdom';

export default function mockBrowser(): void {
    // globalThis.document = DocumentMock as unknown as Document;
    globalThis.localStorage = LocalStorageMock as unknown as Storage;
    globalThis.flexarch = FlexArch;
    // globalThis.window = globalThis as unknown as Window & typeof globalThis;
    const dom = new JSDOM('<html><head></head><body></body></html>');
    globalThis.window = dom.window as unknown as Window & typeof globalThis;
    globalThis.document = dom.window.document as Document;
}

export function makeEvent(
    target: HTMLElement,
    overrides: Record<string, unknown>,
): {
    bubbles: false;
    cancelable: boolean;
    cancelBubble: boolean;
    composed: boolean;
    currentTarget: HTMLElement;
    defaultPrevented: boolean;
    eventPhase: 0;
    isTrusted: boolean;
    returnValue: boolean;
    srcElement: HTMLElement;
    target: HTMLElement;
    timeStamp: unknown;
    type: 'input';
    composedPath: () => [];
    initEvent: () => {};
    preventDefault: () => {};
    stopImmediatePropagation: () => {};
    stopPropagation: () => {};
    AT_TARGET: 0;
    BUBBLING_PHASE: 0;
    CAPTURING_PHASE: 0;
    NONE: 0;
} {
    return {
        bubbles: false,
        cancelable: true,
        cancelBubble: true,
        composed: false,
        currentTarget: target,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        returnValue: false,
        srcElement: target,
        target: target,
        timeStamp: new Date().getTime(),
        type: 'input',
        composedPath: () => [],
        initEvent: () => null,
        preventDefault: () => null,
        stopImmediatePropagation: () => null,
        stopPropagation: () => null,
        AT_TARGET: 0,
        BUBBLING_PHASE: 0,
        CAPTURING_PHASE: 0,
        NONE: 0,
    };
}

mockBrowser();
