import { HColor } from '@Hi/Colors';
import ClickButton from './ClickButton';
import HStack from './HStack';
import Overlay from './Overlay';
import TextContent from './TextView';
import VStack from './VStack';

export default class AlertOverlay extends Overlay {
    constructor(message: string) {
        super(
            new VStack(
                new TextContent(message)
                    .padding()
                    .font('small')
                    .lineHeight('200%'),
                new HStack(
                    new ClickButton(new TextContent('Cancel'))
                        .background(HColor('background').alpha(0.5))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-alert-overlay-cancel-button'),
                    new ClickButton(new TextContent('Ok'))
                        .background(HColor('background').alpha(0.5))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-alert-overlay-confirm-button'),
                ).padding(),
            ).stretch(),
        );
        this.body.style.display = 'flex';
        this.width('100vw')
            .height('100vh')
            .position('fixed')
            .zIndex(100)
            .setTop(0)
            .setLeft(0)
            .blur();
    }

    whenConfirmed(callback: () => void): this {
        (
            this.getViewsByClass(
                'hi-alert-overlay-confirm-button',
            )[0] as ClickButton
        ).whenClicked(callback);
        return this;
    }

    whenCancelled(callback: () => void): this {
        (
            this.getViewsByClass(
                'hi-alert-overlay-cancel-button',
            )[0] as ClickButton
        ).whenClicked(callback);
        return this;
    }
}
