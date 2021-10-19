export default class BrandingRegistryAccess {
    public static getBranding(url: string): Branding {
        return flexarch.brandRegistry(url);
    }

    public static setBranding(url: string, branding: Branding): void {
        flexarch.brandRegistry(url, branding);
    }
}
