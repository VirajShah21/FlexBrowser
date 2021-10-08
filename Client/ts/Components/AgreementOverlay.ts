import View from '@Hi/View';
import ClickButton from './ClickButton';
import HStack from './HStack';
import IonIcon from './IonIcon';
import Overlay from './Overlay';
import ScrollView from './ScrollView';
import TextContent from './TextView';
import VStack from './VStack';

export default class AgreementOverlay extends Overlay {
    constructor(title: string, icon: string, ...agreementContents: View[]) {
        super(
            new VStack(
                new IonIcon(icon).font('lg'),
                new TextContent(title).padding().font('xl'),
                new ScrollView(...agreementContents).height(100),
                new HStack(
                    new ClickButton(new TextContent('Decline'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-agreement-overlay-cancel-button'),
                    new ClickButton(new TextContent('Agree'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-agreement-overlay-confirm-button'),
                ),
            ),
        );
    }

    whenConfirmed(callback: () => void): this {
        (
            this.getViewsByClass(
                'hi-agreement-overlay-confirm-button',
            )[0] as ClickButton
        ).whenClicked(callback);
        return this;
    }

    whenCancelled(callback: () => void): this {
        (
            this.getViewsByClass(
                'hi-agreement-overlay-cancel-button',
            )[0] as ClickButton
        ).whenClicked(callback);
        return this;
    }
}
