import HubTitlebar from '@Components/hub/HubTitlebar';
import { getAverageRGB, HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HIFullScreenView from '@Hi/Components/HIFullScreenView';
import HStack from '@Hi/Components/HStack';
import ImageView from '@Hi/Components/ImageView';
import ScrollView from '@Hi/Components/ScrollView';
import Spacer from '@Hi/Components/Spacer';
import TruncatedTextView from '@Hi/Components/TruncatedTextView';
import VStack from '@Hi/Components/VStack';
import RGBAModel from '@Hi/RGBAModel';
import BrowserPreferences from '@Models/BrowserPreferences';
import ValidURL from '@Models/ValidURL';
import HubTitles from '@Resources/strings/HubTitles.json';

class FlexWindowsViewerItem extends ClickButton {
    private static readonly MAXLEN = 15;

    constructor(meta: URLMeta, windowId: number) {
        const image = new ImageView(FlexWindowsViewerItem.getFaviconURL(meta))
            .rounded('100%')
            .border({
                size: 2,
                style: 'solid',
                color: HColor(BrowserPreferences.colorTheme),
            })
            .width(36)
            .height(36)
            .margin({ bottom: 10 });

        super(
            new VStack(
                // new IonIcon('compass').font('xxl').padding(),
                image,
                new Spacer(),
                new TruncatedTextView(meta.title, FlexWindowsViewerItem.MAXLEN),
                new TruncatedTextView(
                    new ValidURL(meta.url).shortestRepresentation,
                    FlexWindowsViewerItem.MAXLEN,
                )
                    .id('window-title')
                    .foreground(HColor('background').alpha(0.5)),
            ),
        );

        this.rounded()
            .background(HColor(BrowserPreferences.colorTheme))
            .foreground(HColor('background'))
            .padding()
            .margin({ bottom: 25, right: 25 })
            .width(150)
            .height(150)
            .whenClicked(() => {
                flexarch.focusWindow(windowId);
            });

        image.whenLoaded(() => {
            const avg = getAverageRGB(image.body, 1, [RGBAModel.WHITE]);
            this.background(avg);
            if (avg.isLight()) {
                this.foreground(RGBAModel.BLACK);
                this.findViewById('window-title')?.foreground(
                    RGBAModel.BLACK.alpha(0.5),
                );
                image
                    .background(RGBAModel.BLACK)
                    .border({ color: RGBAModel.BLACK });
            } else {
                this.foreground(RGBAModel.WHITE);
                this.findViewById('window-title')?.foreground(
                    RGBAModel.WHITE.alpha(0.5),
                );
                image
                    .background(RGBAModel.WHITE)
                    .border({ color: RGBAModel.WHITE });
            }
        });

        const untriedExtensions = ['png', 'svg', 'jpg'];
        image.whenError(() => {
            if (untriedExtensions.length > 0) {
                image.source = FlexWindowsViewerItem.getFaviconURL(
                    meta,
                    untriedExtensions.splice(0, 1)[0],
                );
            }
        });
    }

    public static getFaviconURL(meta: URLMeta, extension = 'ico'): string {
        const url = new ValidURL(meta.url);
        return `${url.protocol}://${url.domain}/favicon.${extension}`;
    }
}

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
                new HubTitlebar(HubTitles.WindowsViewer).insertBackButton(),
                new ScrollView(
                    new HStack(
                        ...flexarch
                            .getWindowList()
                            .map(
                                meta =>
                                    new FlexWindowsViewerItem(
                                        meta,
                                        meta.windowId ?? 0,
                                    ),
                            ),
                    )
                        .width('100%')
                        .padding()
                        .id('window-buttons-container')
                        .wrap(),
                )
                    .width('100%')
                    .padding()
                    .padding({ top: HubTitlebar.HEIGHT + 10 }),
                new Spacer(),
            ).stretch(),
        );

        this.background(HColor('background').alpha(0.75)).foreground(
            HColor('foreground'),
        );
    }
}
