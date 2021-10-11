import HubTitlebar from '@Components/hub/HubTitlebar';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import {
    navigateBack,
    toggleBookmarkButtonClicked,
} from '@Triggers/hub-triggers';
import strings from '@Resources/strings.json';
import BrowserPreferences from '@UI/BrowserPreferences';
import URLMeta from '@Models/URLMeta';

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
                            .foreground(BrowserPreferences.getPrimaryColor())
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
    constructor(meta: URLMeta) {
        super(
            new VStack(
                new IonIcon('compass').font('xxl').padding(),
                new Spacer(),
                new TextView(
                    meta.title.length < 25
                        ? meta.title
                        : `${meta.title.substring(0, 22)}...`,
                ),
                new TextView(
                    meta.url.length < 25
                        ? meta.url
                        : `${meta.url.substring(0, 22)}...`,
                ).foreground(HColor('background').alpha(0.5)),
            ),
        );

        this.rounded()
            .background(BrowserPreferences.getPrimaryColor())
            .foreground(HColor('background'))
            .padding()
            .width('45vw')
            .height('45vw');
    }
}
