import { expect } from 'chai';
import FlexBrowserWindow from '../src/FlexBrowserWindow';

export default class FlexBrowserWindowSpec {
    public static run(): void {
        describe('FlexBrowserWindow resolving URL Input', () => {
            it('Should convert input to a valid URL', () => {
                expect(FlexBrowserWindow.goodUrl('facebook.com')).to.equal(
                    'https://facebook.com',
                );
            });
        });
    }
}
