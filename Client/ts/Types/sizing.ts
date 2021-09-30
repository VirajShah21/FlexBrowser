export type HISizingValue = string | number;

export type HISizeBoundsObject = {
    min?: HISizingValue;
    max?: HISizingValue;
    default?: HISizingValue;
};

export type HIEdgeSizingObject = {
    top?: HISizingValue;
    right?: HISizingValue;
    bottom?: HISizingValue;
    left?: HISizingValue;
};

export type HICornerSizingObject = {
    top?: { left?: HISizingValue; right?: HISizingValue };
    bottom?: { left?: HISizingValue; right?: HISizingValue };
};

export type HISizeBounds = HISizingValue | HISizeBoundsObject;

export type HIEdgeSizingValue = HISizingValue | HIEdgeSizingObject;

export type HICornerSizingValue = HISizingValue | HICornerSizingObject;

export type HISizingName = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Standardizes an `HISizingValue` to a CSS-valid measurement.
 * If a nubmer is provided, then default units are `px`.
 *
 * @export
 * @param {HISizingValue} size The size to standardize.
 * @returns {string} The CS-valid measurement for the sizing value.
 */
export function sizing(size: HISizingValue): string {
    if (typeof size === 'number') return `${size}px`;
    return size;
}

export const SizingValues = {
    BORDER_RADIUS: {
        xxs: sizing(3),
        xs: sizing(6),
        sm: sizing(9),
        md: sizing(12),
        lg: sizing(15),
        xl: sizing(18),
        xxl: sizing(21),
    },

    PADDING: {
        xxs: sizing(3),
        xs: sizing(6),
        sm: sizing(9),
        md: sizing(12),
        lg: sizing(15),
        xl: sizing(18),
        xxl: sizing(21),
    },

    FONT: {
        xxs: sizing(5),
        xs: sizing(10),
        sm: sizing(12),
        md: sizing(15),
        lg: sizing(18),
        xl: sizing(25),
        xxl: sizing(30),
    },
};

/**
 * Standardizes an `HIEdgeSizingValue` to a map of CSS-valid measurements
 * for top, bottom, left, and right. If a map of `HISizingValues` are provided
 * and is missing values for `top`, `right`, `bottom`, or `left`, then that
 * property will be left out from the returned map. If a regular
 * `HISizingValue` is provided, then the returned map will just return an
 * object containing the standardized CSS-valid measurement for each `top`,
 * `right`, `bottom`, and `left`.
 *
 * @export
 * @param {HIEdgeSizingValue} size The edge sizing instructions.
 * @returns {{
 *     top?: HISizingValue;
 *     right?: HISizingValue;
 *     bottom?: HISizingValue;
 *     left?: HISizingValue;
 * }} A map with CSS-valid measurements for top, right, bottom, and left.
 */
export function edgeSizing(size: HIEdgeSizingValue): {
    top?: HISizingValue;
    right?: HISizingValue;
    bottom?: HISizingValue;
    left?: HISizingValue;
} {
    if (typeof size === 'string' || typeof size === 'number') {
        return {
            top: sizing(size),
            right: sizing(size),
            bottom: sizing(size),
            left: sizing(size),
        };
    }

    const obj: {
        top?: HISizingValue;
        right?: HISizingValue;
        bottom?: HISizingValue;
        left?: HISizingValue;
    } = {};

    if (size.top) obj.top = sizing(size.top);
    if (size.right) obj.right = sizing(size.right);
    if (size.bottom) obj.bottom = sizing(size.bottom);
    if (size.left) obj.left = sizing(size.left);

    return obj;
}
