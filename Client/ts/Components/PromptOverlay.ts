import ClickButton from './ClickButton';
import HStack from './HStack';
import InputField from './InputField';
import Overlay from './Overlay';
import TextField from './TextField';
import TextContent from './TextView';
import VStack from './VStack';

export default class PromptOverlay extends Overlay {
    constructor(prompt: string) {
        super(
            new VStack(
                new TextContent(prompt).padding().font('small'),
                new TextField().addClass('hi-prompt-input'),
                new HStack(
                    new ClickButton(new TextContent('Cancel'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-prompt-overlay-cancel-button'),
                    new ClickButton(new TextContent('Ok'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-prompt-overlay-confirm-button'),
                ).padding(),
            ),
        );
    }

    whenConfirmed(callback: (response: string) => void): this {
        (
            this.getViewsByClass(
                'hi-prompt-overlay-confirm-button',
            )[0] as ClickButton
        ).whenClicked(() => {
            callback(
                (this.getViewsByClass('hi-prompt-input')[0] as InputField)
                    .value,
            );
        });
        return this;
    }

    whenCancelled(callback: () => void): this {
        (
            this.getViewsByClass(
                'hi-prompt-overlay-cancel-button',
            )[0] as ClickButton
        ).whenClicked(callback);
        return this;
    }
}
