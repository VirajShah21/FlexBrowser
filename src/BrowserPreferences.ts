import { HColor, HumanColorName, RGBAModel } from '@Hi/Colors';

export default class BrowserPreferences {
    private static colorTheme: HumanColorName;

    public static setColorTheme(to: HumanColorName): void {
        BrowserPreferences.colorTheme = to;
        localStorage.setItem('flex://color-theme', to);
    }

    public static getColorTheme(): HumanColorName {
        return BrowserPreferences.colorTheme;
    }

    public static getPrimaryColor(): RGBAModel {
        return HColor(BrowserPreferences.colorTheme);
    }

    public static initialize(): void {
        BrowserPreferences.colorTheme = (localStorage.getItem('flex://color-theme') || 'blue') as HumanColorName;
    }
}
