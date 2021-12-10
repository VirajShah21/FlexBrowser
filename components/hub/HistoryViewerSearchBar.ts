import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import TextField from '@Hi/Components/TextField';
import HumanEvent from '@Hi/Types/HumanEvent';
import HistoryViewer from '@UI/FlexHub/HistoryViewer';

export default class HistoryViewerSearchBar extends HStack {
    public constructor() {
        super(
            new IonIcon('search').font('lg'),
            new TextField()
                .background('none')
                .border({ size: 0 })
                .whenChanged(HistoryViewerSearchBar.queryHistory)
                .stretch(),
        );
        this.rounded(50)
            .blur()
            .padding({
                top: 5,
                bottom: 5,
                left: 10,
                right: 10,
            })
            .background(HColor('background').alpha(0.95));
    }

    private static queryHistory(ev: HumanEvent<TextField>) {
        ev.view
            .root<HistoryViewer>(view => view.identifier === 'history-viewer')
            .loadHistory(ev.view.value);
    }
}
