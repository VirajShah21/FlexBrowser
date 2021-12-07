import RGBAModel from './RGBAModel';
import { HumanColorName } from './Types/colors';

export interface ThemeColorSwatch extends Record<HumanColorName, RGBAModel> {
    blue: RGBAModel;
    brown: RGBAModel;
    cyan: RGBAModel;
    green: RGBAModel;
    indigo: RGBAModel;
    mint: RGBAModel;
    orange: RGBAModel;
    pink: RGBAModel;
    purple: RGBAModel;
    red: RGBAModel;
    teal: RGBAModel;
    yellow: RGBAModel;
    gray: RGBAModel;
    gray2: RGBAModel;
    gray3: RGBAModel;
    gray4: RGBAModel;
    gray5: RGBAModel;
    gray6: RGBAModel;
    foreground: RGBAModel;
    background: RGBAModel;
}

export default class HumanColorSwatch {
    public static light: ThemeColorSwatch = {
        blue: new RGBAModel(0, 122, 255),
        brown: new RGBAModel(162, 132, 94),
        cyan: new RGBAModel(50, 173, 230),
        green: new RGBAModel(52, 199, 89),
        indigo: new RGBAModel(88, 86, 214),
        mint: new RGBAModel(0, 199, 190),
        orange: new RGBAModel(255, 149, 0),
        pink: new RGBAModel(255, 45, 85),
        purple: new RGBAModel(175, 82, 222),
        red: new RGBAModel(255, 59, 48),
        teal: new RGBAModel(48, 176, 199),
        yellow: new RGBAModel(255, 204, 0),
        gray: new RGBAModel(142, 142, 147),
        gray2: new RGBAModel(174, 174, 178),
        gray3: new RGBAModel(199, 199, 204),
        gray4: new RGBAModel(209, 209, 214),
        gray5: new RGBAModel(229, 229, 234),
        gray6: new RGBAModel(242, 242, 247),
        foreground: new RGBAModel(0, 0, 0),
        background: new RGBAModel(255, 255, 255),
    };

    public static dark: ThemeColorSwatch = {
        blue: new RGBAModel(10, 132, 255),
        brown: new RGBAModel(172, 142, 104),
        cyan: new RGBAModel(100, 210, 255),
        green: new RGBAModel(48, 209, 88),
        indigo: new RGBAModel(94, 92, 230),
        mint: new RGBAModel(102, 212, 207),
        orange: new RGBAModel(255, 159, 10),
        pink: new RGBAModel(255, 55, 95),
        purple: new RGBAModel(191, 90, 242),
        red: new RGBAModel(255, 69, 58),
        teal: new RGBAModel(64, 200, 224),
        yellow: new RGBAModel(255, 214, 10),
        gray: new RGBAModel(142, 142, 147),
        gray2: new RGBAModel(99, 99, 102),
        gray3: new RGBAModel(72, 72, 74),
        gray4: new RGBAModel(58, 58, 60),
        gray5: new RGBAModel(44, 44, 46),
        gray6: new RGBAModel(28, 28, 30),
        foreground: new RGBAModel(255, 255, 255),
        background: new RGBAModel(0, 0, 0),
    };
}
