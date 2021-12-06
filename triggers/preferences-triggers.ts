import { HColor, HumanColorName } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HumanEvent from '@Hi/Types/HumanEvent';
import BrowserPreferences from '@Models/BrowserPreferences';

export default function highlightColorSelected(
    ev: HumanEvent<ClickButton>,
    color: HumanColorName,
): void {
    BrowserPreferences.ColorTheme = color;
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
        .findViewById(`highlight-${color}`)
        ?.borderBottom({
            size: 3,
            style: 'solid',
            color: HColor('foreground'),
        });
}
