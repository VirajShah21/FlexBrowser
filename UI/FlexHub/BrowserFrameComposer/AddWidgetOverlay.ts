import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Overlay from '@Hi/Components/Overlay';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import WidgetSelectorButton from '@Components/hub/BrowserFrameComposer/WidgetSelectorButton';

export default class AddWidgetOverlay extends Overlay {
    constructor(partition: number, index: number) {
        super(
            new VStack(
                new Spacer(),

                new HStack(
                    new WidgetSelectorButton(
                        'Back Page',
                        new IonIcon('chevron-back-circle-outline'),
                        partition,
                        index,
                        'page-back',
                    ),
                    new WidgetSelectorButton(
                        'Forward Page',
                        new IonIcon('chevron-forward-circle-outline'),
                        partition,
                        index,
                        'page-forward',
                    ),
                    new WidgetSelectorButton(
                        'New Window',
                        new IonIcon('add-circle-outline'),
                        partition,
                        index,
                        'new-window',
                    ),
                ),

                new Spacer(),

                new ClickButton(new TextView('Cancel'))
                    .foreground(HColor('red'))
                    .background(HColor('gray5'))
                    .rounded(7.5)
                    .whenClicked(ev => {
                        ev.view.root().destroy();
                    }),

                new Spacer(),
            ).stretch(),
        );
        this.background(HColor('gray6')).foreground(HColor('foreground'));
    }
}