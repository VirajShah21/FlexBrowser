import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from './BrowserPreferences';
import HubTitlebar from './HubTitlebar';

export default class FlexHub extends HIFullScreenView {
    constructor() {
        super(
            new VStack(
                new HubTitlebar('Flex Hub'),

                new Spacer(),

                new HStack(
                    new Spacer(),

                    HubButton(new IonIcon('albums'), 'Windows').whenClicked(
                        () => {
                            ViewController.navigateTo('windows');
                            ViewController.getController(
                                'AppController'
                            )?.signal('refresh-windows');
                        }
                    ),

                    new Spacer(),

                    HubButton(new IonIcon('bookmarks'), 'Bookmarks'),

                    new Spacer(),

                    HubButton(new IonIcon('time'), 'History'),

                    new Spacer(),

                    HubButton(
                        new IonIcon('cog-outline'),
                        'Preferences'
                    ).whenClicked(() =>
                        ViewController.navigateTo('preferences')
                    ),

                    new Spacer()
                ).stretchWidth(),

                new Spacer()
            )
                .stretch()
                .background(HColor('background'))
                .foreground(HColor('foreground'))
        );

        this.body.style.setProperty('-webkit-app-region', 'drag');
    }
}

function HubButton(icon: IonIcon, title: string): ClickButton {
    return new ClickButton(
        new VStack(icon.font(50), new Spacer(), new TextView(title)).stretch()
    )
        .padding()
        .foreground(BrowserPreferences.getPrimaryColor())
        .width(100)
        .height(100)
        .alignMiddle();
}
