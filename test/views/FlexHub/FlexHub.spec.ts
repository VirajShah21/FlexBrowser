import { getTransitionDefintion } from '@Hi/Transitions/Transition';
import FlexHub from '@UI/FlexHub/FlexHub';
import { expect } from 'chai';

describe('FlexHub -> HubButton (Transition)', () => {
    let hub: FlexHub;

    beforeEach(() => {
        hub = new FlexHub();
    });

    it('Should fade in on buildin.', () => {
        hub.signal('hi:buildin');
        hub.getViewsByClass('hub-menu-button').forEach(btn => {
            const transition = getTransitionDefintion(
                btn.body.style.animationName,
            );
            expect(transition.to.opacity).to.equal(1);
            expect(transition.iterations).to.equal(1);
        });
    });

    it('Should fade out on buidlout.', () => {
        hub.signal('hi:buildout');
        hub.getViewsByClass('hub-menu-button').forEach(btn => {
            const transition = getTransitionDefintion(
                btn.body.style.animationName,
            );
            expect(transition.to.opacity).to.equal(0);
            expect(transition.iterations).to.equal(1);
        });
    });
});
