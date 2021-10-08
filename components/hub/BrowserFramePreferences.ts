import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ViewController } from '@Hi/ViewController';
import BrowserPreferences from '@UI/BrowserPreferences';
import BrowserFrameComposer from '../../views/FlexHub/BrowserFrameComposer/BrowserFrameComposer';

/**
 * Generates a preview of a browser frame
 *
 * @returns {VStack}
 */
function BrowserFramePreview(): VStack {
    return new VStack(
        new HStack(
            new IonIcon('ellipse').foreground(HColor('red')),
            new IonIcon('ellipse').foreground(HColor('orange')),
            new IonIcon('ellipse').foreground(HColor('green')),
            new Spacer(),
        ).width('100%'),
        new HStack(
            new HStack(
                new IonIcon('chevron-back-circle-outline').font('xl'),
                new IonIcon('chevron-forward-circle-outline').font('xl'),
                new Spacer(),
            )
                .width('20%')
                .padding(5),
            new Spacer(),
            new HStack(new TextField('Search or Go to URL').width('100%'))
                .width('60%')
                .padding(5),
            new Spacer(),
            new HStack(
                new IonIcon('refresh-circle-outline').font('xl'),
                new Spacer(),
                new IonIcon('add-circle-outline').font('xl'),
            )
                .width('20%')
                .padding(5),
        ).width('100%'),
    )
        .background(HColor('gray5'))
        .foreground(BrowserPreferences.getPrimaryColor())
        .width('100%')
        .padding(5)
        .rounded()
        .rounded({ bottom: { left: 0, right: 0 } });
}

/**
 * A component part of the main preferences screen.
 * This should show a sample browser frame.
 *
 * @export
 * @class BrowserFramePreferences
 * @extends {VStack}
 */
export default class BrowserFramePreferences extends VStack {
    /**
     * Creates an instance of BrowserFramePreferences.
     *
     * @memberOf BrowserFramePreferences
     */
    constructor() {
        super(
            new HStack(
                new TextView('Browser Frame')
                    .font('md')
                    .bold()
                    .margin({ bottom: 10 }),
                new Spacer(),
                new ClickButton(new TextView('Edit'))
                    .padding(0)
                    .foreground(BrowserPreferences.getPrimaryColor())
                    .whenClicked(() =>
                        ViewController.getController(
                            'AppController',
                        )?.navigateTo(new BrowserFrameComposer()),
                    ),
            ).width('100%'),

            BrowserFramePreview(),
        );

        this.width('100%').padding();
    }
}
