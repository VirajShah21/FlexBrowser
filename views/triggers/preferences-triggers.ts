import { HColor, HumanColorName } from '@Hi/Colors';
import { HumanEvent } from '@Hi/ViewController';
import BrowserPreferences from '@UI/BrowserPreferences';

export function highlightColorSelected(
    ev: HumanEvent,
    color: HumanColorName,
): void {
    BrowserPreferences.setColorTheme(color);
    ev.view
        .root()
        .getViewsByClass('highlight-radio')
        .forEach(view =>
            view.borderBottom({
                size: 0,
            }),
        );
    ev.view
        .root()
        .getViewById(`highlight-${color}`)
        ?.borderBottom({
            size: 3,
            style: 'solid',
            color: HColor('foreground'),
        });
}
