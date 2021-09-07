/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Client/ts/Colors.ts":
/*!*****************************!*\
  !*** ./Client/ts/Colors.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RGBAModel": () => (/* binding */ RGBAModel),
/* harmony export */   "HColor": () => (/* binding */ HColor),
/* harmony export */   "rgb": () => (/* binding */ rgb),
/* harmony export */   "rgba": () => (/* binding */ rgba),
/* harmony export */   "HumanColorSwatch": () => (/* binding */ HumanColorSwatch),
/* harmony export */   "changeTheme": () => (/* binding */ changeTheme),
/* harmony export */   "whichTheme": () => (/* binding */ whichTheme),
/* harmony export */   "getAverageRGB": () => (/* binding */ getAverageRGB)
/* harmony export */ });
/* harmony import */ var _ViewController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewController */ "./Client/ts/ViewController.ts");

class RGBAModel {
    constructor(r, g, b, a = 1) {
        if (r < 0)
            r = 0;
        else if (r > 255)
            r = 255;
        if (g < 0)
            g = 0;
        else if (g > 255)
            g = 255;
        if (b < 0)
            b = 0;
        else if (b > 255)
            b = 255;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    red(r) {
        if (r < 0)
            r = 0;
        else if (r > 255)
            r = 255;
        this.r = r;
        return this;
    }
    green(g) {
        if (g < 0)
            g = 0;
        else if (g > 255)
            g = 255;
        this.g = g;
        return this;
    }
    blue(b) {
        if (b < 0)
            b = 0;
        else if (b > 255)
            b = 255;
        this.b = b % 256;
        return this;
    }
    alpha(a) {
        this.a = a;
        return this;
    }
    toString() {
        if (this.a != 1)
            return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    static copy(rgba) {
        return new RGBAModel(rgba.r, rgba.g, rgba.b, rgba.a);
    }
}
RGBAModel.WHITE = new RGBAModel(255, 255, 255);
RGBAModel.BLACK = new RGBAModel(0, 0, 0);
function HColor(color) {
    if (colorTheme === 'light') {
        return RGBAModel.copy(HumanColorSwatch.light[color]);
    }
    else {
        return RGBAModel.copy(HumanColorSwatch.dark[color]);
    }
}
function rgb(r, g, b) {
    return new RGBAModel(r, g, b);
}
function rgba(r, g, b, a) {
    return new RGBAModel(r, g, b, a);
}
const HumanColorSwatch = {
    light: {
        blue: rgb(0, 122, 255),
        brown: rgb(162, 132, 94),
        cyan: rgb(50, 173, 230),
        green: rgb(52, 199, 89),
        indigo: rgb(88, 86, 214),
        mint: rgb(0, 199, 190),
        orange: rgb(255, 149, 0),
        pink: rgb(255, 45, 85),
        purple: rgb(175, 82, 222),
        red: rgb(255, 59, 48),
        teal: rgb(48, 176, 199),
        yellow: rgb(255, 204, 0),
        gray: rgb(142, 142, 147),
        gray2: rgb(174, 174, 178),
        gray3: rgb(199, 199, 204),
        gray4: rgb(209, 209, 214),
        gray5: rgb(229, 229, 234),
        gray6: rgb(242, 242, 247),
        foreground: rgb(0, 0, 0),
        background: rgb(255, 255, 255),
    },
    dark: {
        blue: rgb(10, 132, 255),
        brown: rgb(172, 142, 104),
        cyan: rgb(100, 210, 255),
        green: rgb(48, 209, 88),
        indigo: rgb(94, 92, 230),
        mint: rgb(102, 212, 207),
        orange: rgb(255, 159, 10),
        pink: rgb(255, 55, 95),
        purple: rgb(191, 90, 242),
        red: rgb(255, 69, 58),
        teal: rgb(64, 200, 224),
        yellow: rgb(255, 214, 10),
        gray: rgb(142, 142, 147),
        gray2: rgb(99, 99, 102),
        gray3: rgb(72, 72, 74),
        gray4: rgb(58, 58, 60),
        gray5: rgb(44, 44, 46),
        gray6: rgb(28, 28, 30),
        foreground: rgb(255, 255, 255),
        background: rgb(0, 0, 0),
    },
};
let colorTheme = (() => {
    const tmp = localStorage.getItem('hi://theme');
    if (tmp == 'light' || tmp == 'dark')
        return tmp;
    return 'light';
})();
function changeTheme(theme) {
    colorTheme = theme;
    _ViewController__WEBPACK_IMPORTED_MODULE_0__.ViewControllerData.controllers.forEach(controller => controller.signal('color'));
    localStorage.setItem('hi://theme', colorTheme);
}
function whichTheme() {
    return colorTheme;
}
/**
 * From: https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
 *
 * @export
 * @param {any} imgEl
 * @returns
 */
function getAverageRGB(imgEl) {
    const blockSize = 5, // only visit every 5 pixels
    canvas = document.createElement('canvas'), context = canvas.getContext && canvas.getContext('2d'), rgb = new RGBAModel(0, 0, 0);
    let data, i = -4, count = 0;
    if (!context) {
        return rgb;
    }
    const height = (canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height);
    const width = (canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width);
    context.drawImage(imgEl, 0, 0);
    try {
        data = context.getImageData(0, 0, width, height);
    }
    catch (e) {
        /* security error, img on diff domain */
        return rgb;
    }
    const length = data.data.length;
    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }
    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);
    return rgb;
}


/***/ }),

/***/ "./Client/ts/Components/ClickButton.ts":
/*!*********************************************!*\
  !*** ./Client/ts/Components/ClickButton.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClickButton)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Types/sizing */ "./Client/ts/Types/sizing.ts");
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");



class ClickButton extends _Hi_View__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor(...children) {
        super('button', ...children);
        this.body.style.border = 'none';
        this.body.style.color = (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('blue').toString();
        this.body.style.background = 'none';
        this.body.style.borderRadius = _Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.BORDER_RADIUS.xxs;
        this.body.style.padding = `${_Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.xxs} ${_Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.sm} ${_Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.xxs} ${_Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.sm}`;
        this.body.style.display = 'flex';
        this.alignMiddle();
    }
    whenClicked(callback) {
        this.body.addEventListener('click', browserEvent => {
            callback({
                type: 'Click',
                view: this,
                browserEvent,
            });
        });
        return this;
    }
    noOutline() {
        this.body.style.outline = 'none';
        return this;
    }
}


/***/ }),

/***/ "./Client/ts/Components/Group.ts":
/*!***************************************!*\
  !*** ./Client/ts/Components/Group.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Group)
/* harmony export */ });
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");

class Group extends _Hi_View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super('div', ...children);
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';
        this.body.style.textAlign = 'center';
        this.body.style.boxSizing = 'border-box';
    }
}


/***/ }),

/***/ "./Client/ts/Components/HIFullScreenView.ts":
/*!**************************************************!*\
  !*** ./Client/ts/Components/HIFullScreenView.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HIFullScreenView)
/* harmony export */ });
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");

class HIFullScreenView extends _Hi_View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super('div', ...children);
        this.width('100vw').height('100vh');
    }
}


/***/ }),

/***/ "./Client/ts/Components/HStack.ts":
/*!****************************************!*\
  !*** ./Client/ts/Components/HStack.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HStack)
/* harmony export */ });
/* harmony import */ var _Stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stack */ "./Client/ts/Components/Stack.ts");

class HStack extends _Stack__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super(...children);
        this.body.style.flexDirection = 'row';
    }
}


/***/ }),

/***/ "./Client/ts/Components/InputField.ts":
/*!********************************************!*\
  !*** ./Client/ts/Components/InputField.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InputField)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Types/sizing */ "./Client/ts/Types/sizing.ts");
/* harmony import */ var _Hi_Types_states__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Types/states */ "./Client/ts/Types/states.ts");
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");




class InputField extends _Hi_View__WEBPACK_IMPORTED_MODULE_3__.default {
    constructor(placeholder) {
        super('input');
        this.model = (0,_Hi_Types_states__WEBPACK_IMPORTED_MODULE_2__.StateObject)({
            value: '',
            placeholder: '',
        }, () => {
            this.body.value = this.model.value; // ! Cannot use setAttribute for assigning input element's value
            this.body.placeholder = this.model.placeholder;
        });
        this.model.value = '';
        this.model.placeholder = placeholder || '';
        this.body.style.margin = '0';
        this.body.style.boxSizing = 'border-box';
        this.body.style.borderRadius = _Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.BORDER_RADIUS.xs;
        this.body.style.border = `1px solid ${(0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5')}`;
        this.body.style.textAlign = 'left';
        this.body.style.padding = _Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.xs;
        this.body.style.boxSizing = 'border-box';
        this.body.addEventListener('input', () => {
            this.model.value = this.body.value;
        });
    }
    whenFocused(callback) {
        this.body.addEventListener('focusin', browserEvent => {
            callback({
                view: this,
                type: 'Focus',
                browserEvent,
            });
        });
        return this;
    }
    whenUnfocused(callback) {
        this.body.addEventListener('focusout', browserEvent => {
            callback({
                view: this,
                type: 'Unfocus',
                browserEvent,
            });
        });
        return this;
    }
    whenChanged(callback) {
        this.body.addEventListener('input', browserEvent => {
            callback({
                view: this,
                type: 'Change',
                browserEvent,
            });
        });
        return this;
    }
    whenKeyPressed(callback) {
        this.body.addEventListener('keypress', browserEvent => {
            callback({
                view: this,
                type: 'KeyPress',
                browserEvent,
                key: browserEvent.key,
            });
        });
        return this;
    }
    noOutline() {
        this.body.style.outline = 'none';
        return this;
    }
}


/***/ }),

/***/ "./Client/ts/Components/IonIcon.ts":
/*!*****************************************!*\
  !*** ./Client/ts/Components/IonIcon.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IonIcon)
/* harmony export */ });
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");

class IonIcon extends _Hi_View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(name) {
        super('ion-icon');
        this.body.setAttribute('name', name);
    }
}


/***/ }),

/***/ "./Client/ts/Components/ScrollView.ts":
/*!********************************************!*\
  !*** ./Client/ts/Components/ScrollView.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollView": () => (/* binding */ ScrollView)
/* harmony export */ });
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");

class ScrollView extends _Hi_View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super('div', ...children);
        this.body.style.overflowY = 'scroll';
        this.body.style.boxSizing = 'border-box';
    }
}


/***/ }),

/***/ "./Client/ts/Components/Spacer.ts":
/*!****************************************!*\
  !*** ./Client/ts/Components/Spacer.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Spacer)
/* harmony export */ });
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");

class Spacer extends _Hi_View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super('div');
        this.body.innerHTML = '&nbsp;';
        this.body.style.flexGrow = '1';
        this.body.style.width = 'auto';
        this.body.style.height = 'auto';
        this.body.style.fontSize = '1px';
    }
}


/***/ }),

/***/ "./Client/ts/Components/Stack.ts":
/*!***************************************!*\
  !*** ./Client/ts/Components/Stack.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Stack)
/* harmony export */ });
/* harmony import */ var _Group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Group */ "./Client/ts/Components/Group.ts");

class Stack extends _Group__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super(...children);
        this.body.style.display = 'flex';
        this.body.style.boxSizing = 'border-box';
    }
}


/***/ }),

/***/ "./Client/ts/Components/TextField.ts":
/*!*******************************************!*\
  !*** ./Client/ts/Components/TextField.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextField)
/* harmony export */ });
/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputField */ "./Client/ts/Components/InputField.ts");

class TextField extends _InputField__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(placeholder) {
        super(placeholder || '');
        this.body.type = 'text';
        this.addClass('hi-textfield');
    }
}


/***/ }),

/***/ "./Client/ts/Components/TextView.ts":
/*!******************************************!*\
  !*** ./Client/ts/Components/TextView.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextView),
/* harmony export */   "FontWeight": () => (/* binding */ FontWeight)
/* harmony export */ });
/* harmony import */ var _Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Types/sizing */ "./Client/ts/Types/sizing.ts");
/* harmony import */ var _Hi_Types_states__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Types/states */ "./Client/ts/Types/states.ts");
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");



class TextView extends _Hi_View__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor(text) {
        super('span');
        this.model = (0,_Hi_Types_states__WEBPACK_IMPORTED_MODULE_1__.StateObject)({
            text: '',
        }, () => {
            this.body.textContent = this.model.text;
        });
        this.model.text = text;
    }
    lineHeight(height) {
        this.body.style.lineHeight = (0,_Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(height);
        return this;
    }
    weight(fontWeight) {
        this.body.style.fontWeight = `${fontWeight}`;
        return this;
    }
}
var FontWeight;
(function (FontWeight) {
    FontWeight[FontWeight["UltraLight"] = 100] = "UltraLight";
    FontWeight[FontWeight["Light"] = 200] = "Light";
    FontWeight[FontWeight["DemiLight"] = 300] = "DemiLight";
    FontWeight[FontWeight["Regular"] = 400] = "Regular";
    FontWeight[FontWeight["Medium"] = 500] = "Medium";
    FontWeight[FontWeight["DemiBold"] = 600] = "DemiBold";
    FontWeight[FontWeight["Bold"] = 700] = "Bold";
    FontWeight[FontWeight["Heavy"] = 800] = "Heavy";
    FontWeight[FontWeight["UltraHeavy"] = 900] = "UltraHeavy";
})(FontWeight || (FontWeight = {}));


/***/ }),

/***/ "./Client/ts/Components/VStack.ts":
/*!****************************************!*\
  !*** ./Client/ts/Components/VStack.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VStack)
/* harmony export */ });
/* harmony import */ var _Stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stack */ "./Client/ts/Components/Stack.ts");

class VStack extends _Stack__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super(...children);
        this.body.style.flexDirection = 'column';
    }
}


/***/ }),

/***/ "./Client/ts/Types/sizing.ts":
/*!***********************************!*\
  !*** ./Client/ts/Types/sizing.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SizingValues": () => (/* binding */ SizingValues),
/* harmony export */   "sizing": () => (/* binding */ sizing),
/* harmony export */   "edgeSizing": () => (/* binding */ edgeSizing)
/* harmony export */ });
const SizingValues = {
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
function sizing(size) {
    if (typeof size == 'number')
        return `${size}px`;
    return size;
}
function edgeSizing(size) {
    if (typeof size == 'string' || typeof size == 'number')
        return { top: sizing(size), right: sizing(size), bottom: sizing(size), left: sizing(size) };
    else {
        const obj = {};
        if (size.top)
            obj.top = sizing(size.top);
        if (size.right)
            obj.right = sizing(size.right);
        if (size.bottom)
            obj.bottom = sizing(size.bottom);
        if (size.left)
            obj.left = sizing(size.left);
        return obj;
    }
}


/***/ }),

/***/ "./Client/ts/Types/states.ts":
/*!***********************************!*\
  !*** ./Client/ts/Types/states.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StateObject": () => (/* binding */ StateObject)
/* harmony export */ });
/**
 * Constructs a proxy object for a state object.
 *
 * @export
 * @template T The state object to observe. (Cannot be a number or string).
 * @param {T} obj The object to observe.
 * @param {(property?: string) => void} onChange The action to trigger once a property on the object is changed.
 * @returns {StateProxy<T>} The observable object.
 */
function StateObject(obj, onChange) {
    const handler = {
        get(target, property, receiver) {
            return Reflect.get(target, property, receiver);
        },
        defineProperty(target, property, descriptor) {
            const result = Reflect.defineProperty(target, property, descriptor);
            onChange(property);
            return result;
        },
        deleteProperty(target, property) {
            const result = Reflect.deleteProperty(target, property);
            onChange(property);
            return result;
        },
    };
    return new Proxy(obj, handler);
}


/***/ }),

/***/ "./Client/ts/View.ts":
/*!***************************!*\
  !*** ./Client/ts/View.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PStatus": () => (/* binding */ PStatus),
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _Types_sizing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Types/sizing */ "./Client/ts/Types/sizing.ts");
/* harmony import */ var _Types_states__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types/states */ "./Client/ts/Types/states.ts");


/**
 * Status codes for the parent to use
 *
 * @export
 * @enum {number}
 */
var PStatus;
(function (PStatus) {
    PStatus[PStatus["Visible"] = 0] = "Visible";
    PStatus[PStatus["Invisible"] = 1] = "Invisible";
    PStatus[PStatus["Destroyed"] = 2] = "Destroyed";
    PStatus[PStatus["Null"] = 0] = "Null";
})(PStatus || (PStatus = {}));
/**
 * The base class for all Human Interface views and components.
 *
 * @export
 * @abstract
 * @class View
 */
class View {
    constructor(element, ...children) {
        this.pstatus = PStatus.Visible;
        this.$children = [];
        this.body = document.createElement(element);
        this.addClass('hi-view');
        this.children = (0,_Types_states__WEBPACK_IMPORTED_MODULE_1__.StateObject)(this.$children, () => {
            this.buildChildren();
        });
        children.forEach(child => {
            this.$children.push(child);
        });
        this.buildChildren();
    }
    /**
     * Retrieves a list of all child Views with the specified class name.
     *
     * @param className The classname of all the views to query.
     * @returns An array of Views with a matching classname.
     */
    getViewsByClass(className) {
        const results = [];
        if (this.$children) {
            for (const child of this.$children) {
                if (child.getClassList().indexOf(className) >= 0)
                    results.push(child);
                child.getViewsByClass(className).forEach(view => {
                    results.push(view);
                });
            }
        }
        return results;
    }
    /**
     * Retrieve the first child View with a specified ID.
     *
     * @param {string} id The ID of the View to query.
     * @returns {(View | null)} A View, if one with the corresponding ID is found. Null otherwise.
     *
     * @memberOf View
     */
    getViewById(id) {
        for (const child of this.$children) {
            if (child.identifier == id)
                return child;
            const childResult = child.getViewById(id);
            if (childResult)
                return childResult;
        }
        return null;
    }
    /**
     * Retrieve the raw data of the DOM structure of this View.
     *
     * @returns {ModelData} The ModelData object associated with this View.
     *
     * @memberOf View
     */
    getModelData() {
        return {
            viewName: this.constructor.name,
            name: `${this.constructor.name}${this.body.id.trim().length > 0 ? `#${this.body.id.trim()}` : ''}.${this.getClassList().join('.')}`,
            id: this.body.id,
            classList: this.getClassList(),
            children: this.$children.map(child => child.getModelData()),
        };
    }
    /**
     * Describes a View. The description is not displayed, but rather used internally or to store data.
     *
     * @param {string} description The description of to assign to this View.
     * @returns {this}
     *
     * @memberOf View
     */
    describe(description) {
        this.description = description;
        return this;
    }
    /**
     * Destroys this View. The View will be completely destroyed and cannot be rebuilt.
     *
     *
     * @memberOf View
     */
    destroy() {
        // Remove from parent
        if (this.parent && this.parent.$children)
            this.parent.$children.splice(this.parent.children.indexOf(this), 1);
        this.body.remove();
        // Clear all instance variables
        this.parent = undefined;
    }
    /**
     * Adds a list of children after all the children of this View.
     *
     * @param {...View[]} children The children to add.
     * @returns {this}
     *
     * @memberOf View
     */
    addChildren(...children) {
        children.forEach(child => {
            this.children.push(child);
        });
        return this;
    }
    /**
     * Assigns a background image to a View via url
     *
     * @param {string} url The URL of the image to display as the background image.
     * @returns {this}
     *
     * @memberOf View
     */
    backgroundImage(url) {
        this.body.style.background = `url(${url})`;
        this.body.style.backgroundSize = 'cover';
        return this;
    }
    /**
     * Assigns the background color of a View
     *
     * @param {(RGBAModel | 'none')} color The RGB color of the image, or 'none' for a transparent background.
     * @returns {this}
     *
     * @memberOf View
     */
    background(color) {
        this.body.style.background = color.toString();
        return this;
    }
    /**
     * Blurs the background of a View.
     *
     * @param {number} [radius=25] The blur radius to apply.
     * @returns {this}
     *
     * @memberOf View
     */
    blur(radius = 25) {
        this.body.style.backdropFilter = `blur(${(0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(radius)})`;
        this.body.style.webkitBackdropFilter = `blur(${(0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(radius)})`;
        return this;
    }
    /**
     * Makes all text bold.
     *
     * @returns {this}
     *
     * @memberOf View
     */
    bold() {
        this.body.style.fontWeight = 'bolder';
        return this;
    }
    /**
     * Adds a class to the class list of a View. This is also applied to the HTMLElement
     *
     * @param {string} classname The classname (or multiple classnames delimited by spaces).
     * @returns {this}
     *
     * @memberOf View
     */
    addClass(classname) {
        this.body.className += ` ${classname}`;
        this.body.className = this.body.className.trim();
        return this;
    }
    /**
     * Retrieves a list of the classnames assigned to this View.
     *
     * @returns {string[]} An array of classname strings.
     *
     * @memberOf View
     */
    getClassList() {
        const classString = this.body.className;
        return classString.split(' ').filter(className => {
            return className.trim() != '';
        });
    }
    /**
     * Fixes a View in place. Scroll events will not affect the physical location of the View relative to the top-left corner of the window.
     * For titlebars (and similar), a z-index should also be assigned to the View.
     *
     * @returns {this}
     *
     * @memberOf View
     */
    fixed() {
        this.body.style.position = 'fixed';
        return this;
    }
    /**
     * Add font details to a View.
     *
     * @param {(string | number | HIFont | HISizingName)} fontClass The font data to provide to View's styling.
     * If a sizing value is provided ("xxs" to "xxl") then the sizing value is used.
     * All other strings are assigned to the styles font property (ex: "Arial" or "15px Arial")
     * @returns {this}
     *
     * @memberOf View
     */
    font(fontClass) {
        if (typeof fontClass == 'string' && Object.prototype.hasOwnProperty.call(_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.SizingValues.FONT, fontClass)) {
            this.body.style.fontSize = _Types_sizing__WEBPACK_IMPORTED_MODULE_0__.SizingValues.FONT[fontClass];
        }
        else if (typeof fontClass == 'string') {
            this.body.style.font = fontClass;
        }
        else if (typeof fontClass == 'number')
            this.body.style.fontSize = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(fontClass);
        else if (typeof fontClass == 'object') {
            if (Object.prototype.hasOwnProperty.call(fontClass, 'family'))
                this.body.style.fontFamily = fontClass.family;
            if (Object.prototype.hasOwnProperty.call(fontClass, 'size') &&
                ['number', 'string'].indexOf(typeof fontClass.size) >= 0)
                this.body.style.fontSize = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(fontClass.size);
            if (Object.prototype.hasOwnProperty.call(fontClass, 'color'))
                this.foreground(fontClass.color);
        }
        return this;
    }
    /**
     * Set a foreground color for the current View. This is used font setting font-color,
     * icon color and border colors.
     *
     * @param {RGBAModel} color The color to assign to the foreground.
     * @returns {this}
     *
     * @memberOf View
     */
    foreground(color) {
        this.body.style.color = color.toString();
        return this;
    }
    forChild(iteratee) {
        for (const child of this.$children)
            iteratee(child);
        return this;
    }
    inline() {
        this.body.style.display = 'inline-flex';
        return this;
    }
    relative() {
        this.body.style.position = 'relative';
        return this;
    }
    removeClass(classname) {
        const classes = this.getClassList();
        if (classes.indexOf(classname) >= 0)
            classes.splice(classes.indexOf(classname), 1);
        this.body.className = classes.join(' ');
        return this;
    }
    removeAllChildren() {
        this.$children.splice(0, this.children.length);
        return this.buildChildren();
    }
    buildChildren() {
        this.body.innerHTML = '';
        this.$children.forEach(child => {
            if (child && child.pstatus == PStatus.Visible) {
                child.parent = this;
                this.body.appendChild(child.body);
            }
        });
        return this;
    }
    root(stopAtView) {
        let root = this.parent;
        if (root == undefined)
            return this;
        if (stopAtView) {
            while (root.parent != undefined) {
                if (stopAtView(root))
                    return root;
                else
                    root = root.parent;
            }
        }
        else
            while (root.parent != undefined)
                root = root.parent;
        return root;
    }
    title(text) {
        this.body.title = text;
        return this;
    }
    id(idName) {
        this.identifier = idName;
        return this;
    }
    grow() {
        this.body.style.flexGrow = '1';
        return this;
    }
    glow(color, size = 10) {
        this.body.style.filter = `drop-shadow(0 0 ${(0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(size)} ${color.toString()})`;
        return this;
    }
    zIndex(index) {
        this.body.style.zIndex = `${index}`;
        return this;
    }
    resizable(axis) {
        if (!axis)
            this.body.style.resize = 'both';
        else
            switch (axis) {
                case 'h':
                    this.body.style.resize = 'horizontal';
                    break;
                case 'v':
                    this.body.style.resize = 'vertical';
                    break;
                default:
                    this.body.style.resize = axis;
            }
        return this;
    }
    // * Alignment
    alignEnd() {
        this.body.style.alignItems = 'flex-end';
        this.body.style.justifyContent = 'flex-end';
        return this;
    }
    alignMiddle() {
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';
        return this;
    }
    alignStart() {
        this.body.style.alignItems = 'flex-start';
        this.body.style.justifyContent = 'flex-start';
        return this;
    }
    // * Text Alignment
    textStart() {
        this.body.style.textAlign = 'left';
        return this;
    }
    textCenter() {
        this.body.style.textAlign = 'center';
        return this;
    }
    textEnd() {
        this.body.style.textAlign = 'right';
        return this;
    }
    // * Frame Modifiers
    stretchWidth() {
        this.body.style.width = '100%';
        return this;
    }
    stretchHeight() {
        this.body.style.height = '100%';
        return this;
    }
    stretch() {
        return this.stretchWidth().stretchHeight();
    }
    border(options) {
        if (options.size != undefined)
            this.body.style.borderWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(options.size);
        if (options.color)
            this.body.style.borderColor = options.color.toString();
        if (options.style)
            this.body.style.borderStyle = options.style;
        return this;
    }
    borderTop(options) {
        if (options.size != undefined)
            this.body.style.borderTopWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(options.size);
        if (options.color)
            this.body.style.borderTopColor = options.color.toString();
        if (options.style)
            this.body.style.borderTopStyle = options.style;
        return this;
    }
    borderRight(options) {
        if (options.size != undefined)
            this.body.style.borderRightWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(options.size);
        if (options.color)
            this.body.style.borderRightColor = options.color.toString();
        if (options.style)
            this.body.style.borderRightStyle = options.style;
        return this;
    }
    borderBottom(options) {
        if (options.size != undefined)
            this.body.style.borderBottomWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(options.size);
        if (options.color)
            this.body.style.borderBottomColor = options.color.toString();
        if (options.style)
            this.body.style.borderBottomStyle = options.style;
        return this;
    }
    borderLeft(options) {
        if (options.size != undefined)
            this.body.style.borderLeftWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(options.size);
        if (options.color)
            this.body.style.borderLeftColor = options.color.toString();
        if (options.style)
            this.body.style.borderLeftStyle = options.style;
        return this;
    }
    padding(amount) {
        if (amount != undefined) {
            const mapping = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.edgeSizing)(amount);
            if (mapping.top)
                this.body.style.paddingTop = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.top);
            if (mapping.right)
                this.body.style.paddingRight = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.right);
            if (mapping.bottom)
                this.body.style.paddingBottom = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.bottom);
            if (mapping.left)
                this.body.style.paddingLeft = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.left);
        }
        else
            this.body.style.padding = '10px';
        return this;
    }
    margin(amount) {
        if (amount != undefined) {
            const mapping = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.edgeSizing)(amount);
            if (mapping.top != undefined)
                this.body.style.marginTop = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.top);
            if (mapping.right != undefined)
                this.body.style.marginRight = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.right);
            if (mapping.bottom != undefined)
                this.body.style.marginBottom = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.bottom);
            if (mapping.left != undefined)
                this.body.style.marginLeft = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.left);
        }
        else
            this.body.style.margin = '10px';
        return this;
    }
    rounded(amount) {
        if (amount != undefined) {
            if (typeof amount === 'string' || typeof amount === 'number')
                this.body.style.borderRadius = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount);
            else {
                if (amount.top) {
                    if (amount.top.left != undefined)
                        this.body.style.borderTopLeftRadius = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.top.left);
                    if (amount.top.right != undefined)
                        this.body.style.borderTopRightRadius = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.top.right);
                }
                if (amount.bottom) {
                    if (amount.bottom.left != undefined)
                        this.body.style.borderBottomLeftRadius = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.bottom.left);
                    if (amount.bottom.right != undefined)
                        this.body.style.borderBottomRightRadius = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.bottom.right);
                }
            }
        }
        else
            this.body.style.borderRadius = '10px';
        return this;
    }
    width(frameWidth) {
        if (typeof frameWidth == 'string' || typeof frameWidth == 'number')
            this.body.style.width = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameWidth);
        else {
            if (frameWidth.min)
                this.body.style.minWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameWidth.min);
            if (frameWidth.max)
                this.body.style.maxWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameWidth.max);
            if (frameWidth.default)
                this.body.style.width = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameWidth.default);
        }
        return this;
    }
    height(frameHeight) {
        if (typeof frameHeight == 'string' || typeof frameHeight == 'number')
            this.body.style.height = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameHeight);
        else {
            if (frameHeight.min)
                this.body.style.minHeight = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameHeight.min);
            if (frameHeight.max)
                this.body.style.maxHeight = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameHeight.max);
            if (frameHeight.default)
                this.body.style.height = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameHeight.default);
        }
        return this;
    }
    // * Position Modifiers
    absolute() {
        this.body.style.position = 'absolute';
        return this;
    }
    position(value) {
        this.body.style.position = value;
        return this;
    }
    block() {
        this.body.style.display = 'block';
        return this;
    }
    flex() {
        this.body.style.display = 'flex';
        return this;
    }
    setBottom(offset) {
        this.body.style.bottom = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(offset);
        return this;
    }
    setTop(offset) {
        this.body.style.top = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(offset);
        return this;
    }
    setLeft(offset) {
        this.body.style.left = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(offset);
        return this;
    }
    setRight(offset) {
        this.body.style.right = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(offset);
        return this;
    }
    opacity(o) {
        this.body.style.opacity = `${o}`;
        return this;
    }
    // * Mouse Hover Event Modifiers
    whenMouseOver(callback) {
        this.body.addEventListener('mouseover', browserEvent => callback({
            view: this,
            type: 'MouseOver',
            browserEvent,
        }));
        return this;
    }
    whenMouseOut(callback) {
        this.body.addEventListener('mouseout', browserEvent => callback({
            view: this,
            type: 'MouseOut',
            browserEvent,
        }));
        return this;
    }
    signal(data) {
        this.handle(data);
        this.$children.forEach(child => child.signal(data));
    }
    handle(data) {
        if (data == '') {
            console.warn('Caught an empty signal');
            console.trace();
        }
    }
}


/***/ }),

/***/ "./Client/ts/ViewController.ts":
/*!*************************************!*\
  !*** ./Client/ts/ViewController.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewControllerData": () => (/* binding */ ViewControllerData),
/* harmony export */   "ViewController": () => (/* binding */ ViewController)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./Client/ts/View.ts");

const ViewControllerData = {
    controllers: [],
    controllerMap: {},
};
/**
 * A ViewController wrapper for a specific wrapper element.
 *
 * @export
 * @class ViewController
 */
class ViewController {
    constructor(screens) {
        this.screens = screens;
        ViewControllerData.controllers.push(this);
    }
    /**
     * Navigates to a screen with a specified name.
     *
     * @param {string} [name='main'] The name of the screen to navigate to. "main" is implicitly passed to this parameter if not specified.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    navigateTo(name = 'main') {
        if (typeof name != 'string')
            throw new Error(`ViewController.navigateTo: Parameter name (1) should be of type string, instead got ${typeof name}`);
        if (!Object.prototype.hasOwnProperty.call(this.screens, name))
            throw new Error(`ViewController.navigateTo: ViewController does not have a screen named ${name}`);
        this.binding.innerHTML = '';
        this.binding.appendChild(this.screens[name].body);
        this.visibleScreen = name;
        return this;
    }
    /**
     * Adds a screen to the navigator wrapper.
     *
     * @param {string} name The name of the new screen.
     * @param {View} screen The view which the screen is attached to.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    addNavigator(name, screen) {
        if (typeof name != 'string')
            throw new Error(`ViewController.addNavigator: Parameter name (1) should be of type string, instead got ${typeof name}`);
        if (!(screen instanceof _View__WEBPACK_IMPORTED_MODULE_0__.default))
            throw new Error(`ViewController.addNavigator: Parameter screen (2) should be of type View, instead got ${typeof screen}.\nValue: ${typeof screen == 'object' ? JSON.stringify(screen, null, 4) : screen}`);
        this.screens[name] = screen;
        return this;
    }
    /**
     * Binds the ViewController to a specified HTMLElement.
     *
     * @param {HTMLElement} [element=document.body] The pre-loaded HTML element to bind to.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    bind(element = document.body) {
        this.binding = element;
        return this;
    }
    /**
     * Adds an event listener for the "resize" event; when the window is resized.
     *
     * @param {(ev: HumanEvent) => void} handler The event handler.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    whenResized(handler) {
        window.addEventListener('resize', ev => handler({ type: 'Resize', view: this.screens[this.visibleScreen], browserEvent: ev }));
        return this;
    }
    /**
     * Maps this controller to a specified name in the ViewController registry.
     *
     * @param {string} controllerName The name of this controller in the registry.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    mapTo(controllerName) {
        ViewControllerData.controllerMap[controllerName] = this;
        return this;
    }
    /**
     * Statically access a controller via the controller's name in the registry.
     *
     * @static
     * @param {string} controllerName The name of the controller to query.
     * @returns {(ViewController | undefined)} The requested ViewController. If a controller with the name is not specified, then this method will return undefined.
     *
     * @memberOf ViewController
     */
    static getController(controllerName) {
        return ViewControllerData.controllerMap[controllerName];
    }
    /**
     * Send a signal to every screen attached to this ViewController.
     *
     * @param {string} data The data to signal.
     *
     * @memberOf ViewController
     */
    signal(data) {
        for (const screen in this.screens)
            this.screens[screen].signal(data);
    }
    /**
     * Automatically navigates to the first found screen with the specified name on any ViewController.
     *
     * @static
     * @param {string} [name='main'] The screen name to navigate to.
     * @returns {(ViewController | null)} The requested ViewController. If no controller is found, then null is returned.
     *
     * @memberOf ViewController
     */
    static navigateTo(name = 'main') {
        const controller = ViewControllerData.controllers.find(currentController => {
            return Object.prototype.hasOwnProperty.call(currentController.screens, name);
        });
        if (controller) {
            controller.navigateTo(name);
            controller.visibleScreen = name;
            return controller;
        }
        else {
            console.warn(`Could not navigate to ${name}`);
            return null;
        }
    }
    /**
     * Puts all screens into a single contained object.
     *
     * @static
     * @returns {Record<string, View>} An object mapping screen names to the screen.
     *
     * @memberOf ViewController
     */
    static allScreens() {
        const screens = {};
        ViewControllerData.controllers.forEach(controller => {
            for (const screen in controller.screens)
                screens[screen] = controller.screens[screen];
        });
        return screens;
    }
}
document.body.style.margin = '0';


/***/ }),

/***/ "./src/BrowserPreferences.ts":
/*!***********************************!*\
  !*** ./src/BrowserPreferences.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BrowserPreferences)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");

class BrowserPreferences {
    static setColorTheme(to) {
        BrowserPreferences.colorTheme = to;
        localStorage.setItem('flex://color-theme', to);
    }
    static getColorTheme() {
        return BrowserPreferences.colorTheme;
    }
    static getPrimaryColor() {
        return (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)(BrowserPreferences.colorTheme);
    }
    static initialize() {
        BrowserPreferences.colorTheme = (localStorage.getItem('flex://color-theme') || 'blue');
    }
}


/***/ }),

/***/ "./src/FlexBrowserWindow.ts":
/*!**********************************!*\
  !*** ./src/FlexBrowserWindow.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlexBrowserWindow)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/ClickButton */ "./Client/ts/Components/ClickButton.ts");
/* harmony import */ var _Hi_Components_HIFullScreenView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/HIFullScreenView */ "./Client/ts/Components/HIFullScreenView.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/IonIcon */ "./Client/ts/Components/IonIcon.ts");
/* harmony import */ var _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/Spacer */ "./Client/ts/Components/Spacer.ts");
/* harmony import */ var _Hi_Components_TextField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/TextField */ "./Client/ts/Components/TextField.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");
/* harmony import */ var _BrowserPreferences__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BrowserPreferences */ "./src/BrowserPreferences.ts");









class FlexBrowserWindow extends _Hi_Components_HIFullScreenView__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor() {
        super(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_7__.default(new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_3__.default(new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_3__.default(TaskbarButton(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_4__.default('chevron-back-circle-outline')).whenClicked(() => this.previousPage()), TaskbarButton(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_4__.default('chevron-forward-circle-outline')).whenClicked(() => this.nextPage()), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_5__.default())
            .width('25%')
            .padding({ left: 10, right: 10 }), new _Hi_Components_TextField__WEBPACK_IMPORTED_MODULE_6__.default('flex://home')
            .width({ min: 200, default: '50%', max: 600 })
            .textCenter()
            .id('url')
            .whenChanged(ev => {
            const browserWindow = ev.view.root(view => view.isBrowserWindow);
            const icon = browserWindow.getViewById('url-refresh-button');
            icon.body.name = 'arrow-forward-outline'; // ! Workaround to use .name
        })
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray6'))
            .noOutline()
            .whenFocused(ev => ev.view.background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('background')).textStart())
            .whenUnfocused(ev => ev.view.background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray6')).textCenter())
            .whenKeyPressed(ev => {
            if (ev.key == 'Enter') {
                const browserWindow = ev.view.root(view => view.isBrowserWindow);
                const searchbar = this.getViewById('url');
                browserWindow.goTo(searchbar.model.value);
            }
        }), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_3__.default(TaskbarButton(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_4__.default('refresh-circle-outline').id('url-refresh-button')).whenClicked(ev => {
            const browserWindow = ev.view.root(view => view.isBrowserWindow);
            const url = browserWindow.getViewById('url').model.value;
            browserWindow.goTo(url);
        }), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_5__.default(), TaskbarButton(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_4__.default('add-circle-outline')).whenClicked(() => {
            flexarch.newWindow();
        }))
            .width('25%')
            .padding({ left: 10, right: 10 }))
            .blur()
            .stretchWidth()
            .padding()
            .padding({ top: 20, bottom: 20 })
            .id('titlebar'), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_5__.default() // Pushes navbar to top and makes space for Electron.BrowserView
        )
            .stretch()
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray6').alpha(0.8)));
        this.isBrowserWindow = true;
        this.history = [];
        this.historyPointer = 0;
        this._ = console.log('FlexBrowserWindow');
        const titlebar = this.getViewById('titlebar');
        titlebar.body.style.setProperty('-webkit-app-region', 'drag');
    }
    static goodUrl(url) {
        url = url.trim();
        let goodProtocol = false;
        if (url.includes('://')) {
            const givenProtocol = url.substring(0, url.indexOf('://'));
            if (FlexBrowserWindow.PROTOCOLS.indexOf(givenProtocol) >= 0) {
                goodProtocol = true;
            }
        }
        if (!goodProtocol)
            url = `https://${url}`;
        return url;
    }
    goTo(url, addToHistory = true) {
        url = FlexBrowserWindow.goodUrl(url);
        const icon = this.getViewById('url-refresh-button');
        const urlbar = this.getViewById('url');
        flexarch.changeUrl(url);
        icon.body.name = 'refresh-circle-outline'; // ! Workaround to use .name
        if (addToHistory) {
            this.history.push(url);
            this.historyPointer = this.history.length - 1;
        }
        urlbar.model.value = url;
    }
    previousPage() {
        console.log(this);
        this.historyPointer--;
        if (this.historyPointer >= 0 && this.historyPointer < this.history.length) {
            this.goTo(this.history[this.historyPointer], false);
            console.log(`Navigating back to ${this.history[this.historyPointer]}`);
        }
        else {
            this.historyPointer++;
            console.log('Could not navigate back anymore');
        }
    }
    nextPage() {
        this.historyPointer++;
        if (this.historyPointer >= 0 && this.historyPointer < this.history.length) {
            this.goTo(this.history[this.historyPointer]);
            console.log(`Navigating forward to ${this.history[this.historyPointer]}`, false);
        }
        else {
            this.historyPointer--;
            console.log('Could not navigate more forward');
        }
    }
}
FlexBrowserWindow.PROTOCOLS = ['http', 'https'];
function TaskbarButton(icon) {
    return new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__.default(icon.foreground(_BrowserPreferences__WEBPACK_IMPORTED_MODULE_8__.default.getPrimaryColor()))
        .rounded()
        .font('xl')
        .padding(3)
        .whenMouseOver(ev => ev.view.background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray3')))
        .whenMouseOut(ev => ev.view.background('none'));
}


/***/ }),

/***/ "./src/FlexHub.ts":
/*!************************!*\
  !*** ./src/FlexHub.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlexHub)
/* harmony export */ });
/* harmony import */ var _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Components/ClickButton */ "./Client/ts/Components/ClickButton.ts");
/* harmony import */ var _Hi_Components_HIFullScreenView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/HIFullScreenView */ "./Client/ts/Components/HIFullScreenView.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/IonIcon */ "./Client/ts/Components/IonIcon.ts");
/* harmony import */ var _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/Spacer */ "./Client/ts/Components/Spacer.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");
/* harmony import */ var _Hi_ViewController__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Hi/ViewController */ "./Client/ts/ViewController.ts");
/* harmony import */ var _BrowserPreferences__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BrowserPreferences */ "./src/BrowserPreferences.ts");









class FlexHub extends _Hi_Components_HIFullScreenView__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor() {
        super(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__.default(new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Flex Hub').font('xxl').bold().margin({ bottom: 25 }), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default(), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default(), HubButton(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_3__.default('albums'), 'Windows').whenClicked(() => {
            _Hi_ViewController__WEBPACK_IMPORTED_MODULE_7__.ViewController.navigateTo('windows');
            _Hi_ViewController__WEBPACK_IMPORTED_MODULE_7__.ViewController.getController('AppController')?.signal('refresh-windows');
        }), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default(), HubButton(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_3__.default('bookmarks'), 'Bookmarks'), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default()).stretchWidth(), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default(), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default(), HubButton(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_3__.default('time'), 'History'), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default(), HubButton(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_3__.default('cog-outline'), 'Preferences').whenClicked(() => _Hi_ViewController__WEBPACK_IMPORTED_MODULE_7__.ViewController.navigateTo('preferences')), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default()).stretchWidth(), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default(), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default()).stretch());
        this.body.style.setProperty('-webkit-app-region', 'drag');
    }
}
function HubButton(icon, title) {
    return new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_0__.default(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__.default(icon.font(50), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default(title)).stretch())
        .padding()
        .foreground(_BrowserPreferences__WEBPACK_IMPORTED_MODULE_8__.default.getPrimaryColor())
        .width(100)
        .height(100)
        .alignMiddle();
}


/***/ }),

/***/ "./src/FlexPreferences.ts":
/*!********************************!*\
  !*** ./src/FlexPreferences.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlexPreferences)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/ClickButton */ "./Client/ts/Components/ClickButton.ts");
/* harmony import */ var _Hi_Components_HIFullScreenView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/HIFullScreenView */ "./Client/ts/Components/HIFullScreenView.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/IonIcon */ "./Client/ts/Components/IonIcon.ts");
/* harmony import */ var _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/Spacer */ "./Client/ts/Components/Spacer.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");
/* harmony import */ var _BrowserPreferences__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BrowserPreferences */ "./src/BrowserPreferences.ts");









class FlexPreferences extends _Hi_Components_HIFullScreenView__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor() {
        super(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_7__.default(new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_5__.default(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_6__.default('Preferences').font('xxl').bold(), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_5__.default(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_6__.default('Color Theme').font('md').bold().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray4')).margin({ bottom: 10 }), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_3__.default(...[
            'blue',
            'brown',
            'cyan',
            'green',
            'indigo',
            'mint',
            'orange',
            'pink',
            'purple',
            'red',
            'teal',
            'yellow',
        ].map(color => ColorThemeButton(color))).stretchWidth(), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_5__.default()).stretch());
    }
}
function ColorThemeButton(color) {
    return new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_4__.default('ellipse').font('xxl').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)(color))).whenClicked(() => {
        _BrowserPreferences__WEBPACK_IMPORTED_MODULE_8__.default.setColorTheme(color);
        window.location.reload();
    });
}


/***/ }),

/***/ "./src/FlexWindowsViewer.ts":
/*!**********************************!*\
  !*** ./src/FlexWindowsViewer.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlexWindowViewer)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_HIFullScreenView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/HIFullScreenView */ "./Client/ts/Components/HIFullScreenView.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/IonIcon */ "./Client/ts/Components/IonIcon.ts");
/* harmony import */ var _Hi_Components_ScrollView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/ScrollView */ "./Client/ts/Components/ScrollView.ts");
/* harmony import */ var _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/Spacer */ "./Client/ts/Components/Spacer.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");








class FlexWindowViewer extends _Hi_Components_HIFullScreenView__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor() {
        super(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_7__.default(new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_6__.default('Windows').font('xxl').bold().margin({ top: 25, bottom: 25 }), new _Hi_Components_ScrollView__WEBPACK_IMPORTED_MODULE_4__.ScrollView(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_7__.default().stretchWidth().padding()).stretchWidth().padding(), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_5__.default()).stretch());
    }
}
function WindowButton(title, favicon) {
    return new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_3__.default('ellipse').padding(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_6__.default(title).padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray')), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_5__.default())
        .stretchWidth()
        .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray6'))
        .padding()
        .rounded();
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/FlexBrowserApp.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Hi_ViewController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/ViewController */ "./Client/ts/ViewController.ts");
/* harmony import */ var _BrowserPreferences__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BrowserPreferences */ "./src/BrowserPreferences.ts");
/* harmony import */ var _FlexBrowserWindow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FlexBrowserWindow */ "./src/FlexBrowserWindow.ts");
/* harmony import */ var _FlexHub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FlexHub */ "./src/FlexHub.ts");
/* harmony import */ var _FlexPreferences__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FlexPreferences */ "./src/FlexPreferences.ts");
/* harmony import */ var _FlexWindowsViewer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FlexWindowsViewer */ "./src/FlexWindowsViewer.ts");






_BrowserPreferences__WEBPACK_IMPORTED_MODULE_1__.default.initialize();
const flexWindow = document.body.dataset.window;
console.log(flexWindow);
new _Hi_ViewController__WEBPACK_IMPORTED_MODULE_0__.ViewController({
    browser: new _FlexBrowserWindow__WEBPACK_IMPORTED_MODULE_2__.default(),
    hub: new _FlexHub__WEBPACK_IMPORTED_MODULE_3__.default(),
    preferences: new _FlexPreferences__WEBPACK_IMPORTED_MODULE_4__.default(),
    windows: new _FlexWindowsViewer__WEBPACK_IMPORTED_MODULE_5__.default(),
})
    .bind()
    .navigateTo(flexWindow || 'browser')
    .mapTo(`AppController`);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map