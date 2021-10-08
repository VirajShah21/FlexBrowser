import { describe } from 'mocha';
import ValidURL from '@Models/ValidURL';
import { expect } from 'chai';

describe('Models.ValidURL: When constructed with a URL query', () => {
    let url1 = new ValidURL('google.com');
    let url2 = new ValidURL('https://www.google.com');
    let url3 = new ValidURL('http://google.com/');
    let url4 = new ValidURL('https://www.google.com/search?q=Hello+World');
    let url5 = new ValidURL('https://google.com/drive/something');
    let url6 = new ValidURL('fake://google.com');

    it('Should assume HTTPS protocol', () => {
        expect(url1.protocol).to.equal('https');
    });

    it('Should retrieve the explicit protocol if one exists', () => {
        expect(url2.protocol).to.equal('https');
        expect(url3.protocol).to.equal('http');
        expect(url4.protocol).to.equal('https');
        expect(url5.protocol).to.equal('https');
    });

    it('Should throw an error when an unknown protocol is provided', () => {
        expect(() => url6.protocol).to.throw(Error);
    });

    it('Should get the domain name without any trailing slashes', () => {
        [url1, url3, url5].forEach(url =>
            expect(url.domain).to.equal('google.com'),
        );

        [url2, url4].forEach(url =>
            expect(url.domain).to.equal('www.google.com'),
        );
    });

    it('Should get the path if provided (default is "/")', () => {
        [url1, url2, url3].forEach(url => expect(url.path).to.equal('/'));
        expect(url4.path).to.equal('/search?q=Hello+World');
        expect(url5.path).to.equal('/drive/something');
    });

    it('Should throw an error when getting domain or path when an unknown protocol is provided', () => {
        expect(() => url6.domain).to.throw(Error);
        expect(() => url6.path).to.throw(Error);
    });
});
