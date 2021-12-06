import BrowserPreferences from '@Models/BrowserPreferences';
import { expect } from 'chai';

describe('BrowserPreferences: Getting properties not found in FlexRC.', () => {
    it('Should fallback on "blue" color theme', () => {
        expect(BrowserPreferences.ColorTheme).to.equal('blue');
    });

    it('Should fallback on just Google as a search engine', () => {
        expect(BrowserPreferences.SearchEngines).to.eql([
            {
                id: 'google',
                name: 'Google Search',
                urlPrefix: 'https://www.google.com/search?q=',
            },
        ]);
    });

    it('Should default to Google as default search engine object', () => {
        expect(BrowserPreferences.getDefaultCustomerSearchEngine()).to.eql({
            id: 'google',
            name: 'Google Search',
            urlPrefix: 'https://www.google.com/search?q=',
        });
    });

    it('Should default to Google as default search engine', () => {
        expect(BrowserPreferences.DefaultSearchEngine).to.equal('google');
    });
});
