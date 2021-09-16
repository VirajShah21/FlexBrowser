export type StateProxy<T> = T;

/**
 * Constructs a proxy object for a state object.
 *
 * @export
 * @template T The state object to observe. (Cannot be a number or string).
 * @param {T} obj The object to observe.
 * @param {(property?: string) => void} onChange The action to trigger once a property on the object is changed.
 * @returns {StateProxy<T>} The observable object.
 */
export function StateObject<T extends Record<string, unknown> | unknown[]>(
    obj: T,
    onChange: (property?: string) => void
): StateProxy<T> {
    const handler = {
        get(target: T, property: string, receiver: unknown): unknown {
            return Reflect.get(target, property, receiver);
        },
        defineProperty(
            target: T,
            property: string,
            descriptor: PropertyDescriptor
        ) {
            const result = Reflect.defineProperty(target, property, descriptor);
            onChange(property);
            return result;
        },
        deleteProperty(target: T, property: string) {
            const result = Reflect.deleteProperty(target, property);
            onChange(property);
            return result;
        },
    };

    return new Proxy(obj, handler);
}
