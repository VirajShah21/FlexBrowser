import ThemedButton from '@Components/TaskbarButtons/ThemedButton';
import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import TextBox from '@Hi/Components/TextBox';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import Resources from '@Hi/Resources';
import BrowserPreferences from '@Models/BrowserPreferences';

export default class BugReportFeatureSelection extends VStack {
    constructor() {
        super(
            new TextView('Description')
                .bold()
                .textStart()
                .width('100%')
                .foreground(HColor('gray')),
            new TextBox(
                'Enter any additional details about the bug you encountered',
            )
                .rounded()
                .height(150)
                .width('100%')
                .padding(5)
                .foreground(HColor('foreground').alpha(0.9))
                .background(HColor('background').alpha(0.5))
                .border({
                    size: 1,
                    style: 'solid',
                    color: HColor('gray5'),
                }),
            new HStack(
                Resources.getImageView('flex-logs.png')
                    .rounded()
                    .padding()
                    .height(100)
                    .background(HColor('gray4'))
                    .border({
                        size: 1,
                        style: 'solid',
                        color: HColor('gray3'),
                    }),
                new VStack(
                    new TextView('Logfile')
                        .bold()
                        .textStart()
                        .width('100%')
                        .foreground(HColor('gray'))
                        .margin({ bottom: 5 }),
                    new TextView(
                        'By submitting this log report, you are also submitting the necessary log files with it. This will allow us to replicate and diagnose the bug to resolve the issue.',
                    )
                        .textStart()
                        .width('100%')
                        .foreground(HColor('gray3')),
                ).padding(),
            )
                .padding()
                .rounded()
                .margin({ top: 25 })
                .background(HColor('gray5'))
                .border({ size: 1, style: 'solid', color: HColor('gray4') }),

            new ThemedButton(new TextView('Submit'))
                .foreground(HColor('background'))
                .foreground(HColor(BrowserPreferences.ColorTheme)),
        );

        this.stretch();
    }
}
