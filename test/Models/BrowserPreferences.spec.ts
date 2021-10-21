import BrowserPreferences from '@Models/BrowserPreferences';
import { expect } from 'chai';

describe('BrowserPreferences: Getting properties not found in FlexRC.', () => {
    it('Should fallback on "blue" color theme', () => {
        expect(BrowserPreferences.colorTheme).to.equal('blue');
    });

    it('Should fallback on NO custom search engines', () => {
        expect(BrowserPreferences.searchEngines).to.eql([]);
    });

    it('Should default to Google as default search engine', () => {
        expect(BrowserPreferences.defaultSearchEngine).to.eql({
            id: 'google',
            name: 'Google',
            urlPrefix: 'https://google.com/search?q=',
        });
    });
});

describe('BrowserPreferences: Test assertions for preference values', () => {
    it('assertIsHumanColorName: Should validate HumanColorName strings', () => {
        [
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
            'gray',
            'gray2',
            'gray3',
            'gray4',
            'gray5',
            'gray6',
            'foreground',
            'background',
        ].forEach(color => BrowserPreferences.assertIsHumanColorName(color)); // Should just never throw an error
    });

    it('assertIsHumanColorName: Should throw an error if a non-HumanColorName is provided', () => {
        expect(() => BrowserPreferences.assertIsHumanColorName(null)).to.throw(
            Error,
        );
        expect(() => BrowserPreferences.assertIsHumanColorName('foo')).to.throw(
            Error,
        );
    });

    it('assertIsTheme: Should (and must) only allow the values: "light" and "dark"', () => {
        BrowserPreferences.assertIsTheme('light');
        BrowserPreferences.assertIsTheme('dark');

        // Must reach till here without throwing the assertion error

        expect(() => BrowserPreferences.assertIsTheme('blue')).to.throw(Error);
    });

    it('assertIsCustomSearchEngineObject: Should validate all properties of CSE object', () => {
        BrowserPreferences.assertIsCustomSearchEngineObject({
            id: 'stack-overflow',
            name: 'Stack Overflow',
            urlPrefix: 'https://stackoverflow.com/search?q=',
        });
        // Should get here without errors
    });

    it('assertIsCustomSearchEngineObject: Should check CSE ID for spaces', () => {
        expect(() =>
            BrowserPreferences.assertIsCustomSearchEngineObject({
                id: 'stack overflow',
                name: 'Stack Overflow',
                urlPrefix: 'http://stackoverflow.com/search?q=',
            }),
        ).to.throw(Error);
    });

    it('assertIsCustomSearchEngineObject: Should verify all CSE property values are strings', () => {
        expect(() =>
            BrowserPreferences.assertIsCustomSearchEngineObject({
                id: 'stack-overflow',
                name: 1,
                urlPrefix: 'http://stackoverflow.com/search?q=',
            }),
        ).to.throw(Error);

        expect(() =>
            BrowserPreferences.assertIsCustomSearchEngineObject({
                id: 'stack-overflow',
                name: 'Stack Overflow',
                urlPrefix: false,
            }),
        ).to.throw(Error);

        expect(() =>
            BrowserPreferences.assertIsCustomSearchEngineObject({
                id: [],
                name: 'Stack Overflow',
                urlPrefix: 'https://stackoverflow.com/search?q=',
            }),
        ).to.throw(Error);
    });
});
