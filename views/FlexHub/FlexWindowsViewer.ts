import HubTitlebar from '@Components/hub/HubTitlebar';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import TruncatedTextView from '@Hi/Components/TruncatedTextView';
import VStack from '@Hi/Components/VStack';
import URLMeta from '@Models/URLMeta';
import strings from '@Resources/strings.json';
import { navigateBack } from '@Triggers/hub-triggers';
import BrowserPreferences from '@UI/BrowserPreferences';

/**
 * The Window (list) Viewer in the Hub.
 *
 * @export
 * @class FlexWindowViewer
 * @extends {HIFullScreenView}
 */
export default class FlexWindowViewer extends HIFullScreenView {
    /**
     * Creates an instance of FlexWindowViewer without any windows listed.
     *
     * @memberOf FlexWindowViewer
     */
    constructor() {
        super(
            new VStack(
                new HubTitlebar(
                    strings.windows_viewer_title,
                    new HStack(
                        new ClickButton(new TextView('Back'))
                            .foreground(HColor(BrowserPreferences.colorTheme))
                            .padding(0)
                            .whenClicked(navigateBack)
                            .id('back-btn'),
                        new Spacer(),
                    ).width('100%'),
                ),
                new ScrollView(
                    new VStack(
                        ...flexarch
                            .getWindowList()
                            .map(meta => new FlexWindowsViewerItem(meta)),
                    )
                        .width('100%')
                        .padding()
                        .id('window-buttons-container'),
                )
                    .width('100%')
                    .padding(),
                new Spacer(),
            ).stretch(),
        );

        this.background(HColor('background').alpha(0.75)).foreground(
            HColor('foreground'),
        );
    }
}

class FlexWindowsViewerItem extends ClickButton {
    private static readonly MAXLEN = 55;

    constructor(meta: URLMeta) {
        super(
            new VStack(
                new IonIcon('compass').font('xxl').padding(),
                new Spacer(),
                new TruncatedTextView(meta.title, FlexWindowsViewerItem.MAXLEN),
                new TruncatedTextView(
                    meta.url,
                    FlexWindowsViewerItem.MAXLEN,
                ).foreground(HColor('background').alpha(0.5)),
            ),
        );

        this.rounded()
            .background(HColor(BrowserPreferences.colorTheme))
            .foreground(HColor('background'))
            .padding()
            .width('100%')
            .margin({ bottom: 25 });
    }
}
