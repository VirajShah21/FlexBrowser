import Favicon from '@Components/Favicon';
import HistoryViewerSearchBar from '@Components/hub/HistoryViewerSearchBar';
import HubTitlebar from '@Components/hub/HubTitlebar';
import ThemedButton from '@Components/ThemedButton';
import { HColor } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Spacer from '@Hi/Components/Spacer';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import BrowserPreferences from '@Models/BrowserPreferences';
import ValidURL from '@Models/ValidURL';
import BaseHubWindow from './BaseHubWindow';

type DayOfWeek = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
type Month =
    | 'Jan'
    | 'Feb'
    | 'Mar'
    | 'Apr'
    | 'May'
    | 'Jun'
    | 'Jul'
    | 'Aug'
    | 'Sep'
    | 'Oct'
    | 'Nov'
    | 'Dec';

interface HistoryRecord {
    date: {
        day: DayOfWeek;
        month: Month;
        date: number;
        year: number;
    };
    time: {
        h: number;
        m: number;
        s: number;
    };
    url: string;
    title: string;
}

class HistoryViewerItem extends ThemedButton {
    constructor(record: HistoryRecord) {
        super(
            new HStack(
                new Favicon(new ValidURL(record.url)).width(16).height(16),
                new TextView(record.title)
                    .foreground(HColor('gray'))
                    .margin({ left: 10 }),
                new Spacer(),
                new ClickButton(
                    new IonIcon('close-circle').font('lg'),
                ).foreground(HColor('gray4')),
            ).stretch(),
        );

        this.width('100%')
            .background(HColor('background').alpha(0.5))
            .border({ size: 1, style: 'solid', color: HColor('gray5') })
            .margin({ top: 5 })
            .rounded(50)
            .whenMouseOver(ev =>
                ev.view.background(HColor('background').alpha(0.9)),
            )
            .whenMouseOut(ev =>
                ev.view.background(HColor('background').alpha(0.5)),
            );
    }
}

export default class HistoryViewer extends BaseHubWindow {
    constructor() {
        super(
            'History',
            new HStack(
                new HistoryViewerSearchBar().width('100%'),

                new ClickButton(
                    new HStack(
                        new IonIcon('shield-checkmark')
                            .margin({
                                right: 5,
                            })
                            .font('lg'),
                        new TextView('Manage').margin({ left: 5 }).font('md'),
                    ),
                )
                    .background(HColor(BrowserPreferences.ColorTheme))
                    .foreground(HColor('background'))
                    .rounded(50)
                    .padding()
                    .margin({ left: 10 }),
            )
                .width('100%')
                .fixed()
                .zIndex(100)
                .setTop(HubTitlebar.HEIGHT)
                .setLeft(0)
                .padding(10),
            new VStack()
                .id('history-container')
                .width('100%')
                .padding({ top: 50 }),
        );

        this.id('history-viewer');

        this.loadHistory();
    }

    public static async getHistory(): Promise<HistoryRecord[]> {
        const records = await flexarch.getHistory();

        return records
            .split('\n')
            .filter(record => record.trim().length > 0)
            .map(record => HistoryViewer.parseHistoryRecord(record));
    }

    public async loadHistory(query?: string): Promise<void> {
        let records = await HistoryViewer.getHistory();

        if (query) {
            records = records.filter(
                record =>
                    record.title.toLowerCase().includes(query.toLowerCase()) ||
                    record.url.toLowerCase().includes(query.toLowerCase()),
            );
        }

        this.findViewById('history-container')
            ?.removeAllChildren()
            .addChildren(
                ...records.map(record => new HistoryViewerItem(record)),
            );
    }

    public static parseHistoryRecord(record: string): HistoryRecord {
        const split = record.split(' ');
        const day = split[0] as DayOfWeek;
        const month = split[1] as Month;
        const date = parseInt(split[2] as string, 10);
        const year = parseInt(split[3] as string, 10);
        const time = split[4] as string;

        const protocolSlashStart = record.indexOf('://');
        let urlStart = 0; // just a default value to avoid TS errors
        let urlEnd = 0; // just a default value to avoid TS errors

        for (let i = protocolSlashStart; i >= 0; i -= 1) {
            if (record[i] === ' ') {
                urlStart = i + 1;
                break;
            }
        }

        for (let i = urlStart; i < record.length; i += 1) {
            if (record[i] === ' ') {
                urlEnd = i;
                break;
            }
        }

        const url = record.substring(urlStart, urlEnd);

        const title = record.substring(urlEnd + 1);

        return {
            date: {
                day,
                month,
                year,
                date,
            },
            time: {
                h: parseInt(time.split(':')[0] as string, 10),
                m: parseInt(time.split(':')[1] as string, 10),
                s: parseInt(time.split(':')[2] as string, 10),
            },
            url,
            title,
        };
    }
}
