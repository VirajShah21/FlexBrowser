import HistoryViewer from '@UI/FlexHub/HistoryViewer';
import { expect } from 'chai';

describe('HistoryViewer', () => {
    it('Should correctly parse all fields of a history record', () => {
        const results = HistoryViewer.parseHistoryRecord(
            'Thu Nov 25 2021 03:51:34 GMT-0500 (Eastern Standard Time) https://www.google.com/ Google',
        );

        expect(results.date.date).to.equal(25);
        expect(results.date.day).to.equal('Thu');
        expect(results.date.month).to.equal('Nov');
        expect(results.date.year).to.equal(2021);
        expect(results.time.h).to.equal(3);
        expect(results.time.m).to.equal(51);
        expect(results.time.s).to.equal(34);
        expect(results.url).to.equal('https://www.google.com/');
        expect(results.title).to.equal('Google');
    });
});
