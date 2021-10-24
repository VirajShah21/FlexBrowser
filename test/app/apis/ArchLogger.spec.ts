import { expect } from 'chai';
import { dedent } from '../../../app/apis/ArchLogger';

describe('ArchLogger: Dedenting', () => {
    it('Should return the original string when using only one line', () => {
        expect(dedent('Hello World')).to.equal('Hello World');
    });

    it('Should dedent according to second line of original string', () => {
        expect(
            dedent(`
                Hello World
                My name is Viraj`),
        ).to.equal('Hello World\nMy name is Viraj');

        expect(
            dedent(`
                Hello World
                    This should be indented
            `),
        ).to.equal('Hello World\n    This should be indented');
    });

    // it('Should')
});
