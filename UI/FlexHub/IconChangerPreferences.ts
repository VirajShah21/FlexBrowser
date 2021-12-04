import SectionTitle from '@Components/SectionTitle';
import ThemedButton from '@Components/ThemedButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import ScrollView from '@Hi/Components/ScrollView';
import VStack from '@Hi/Components/VStack';
import RGBAModel from '@Hi/RGBAModel';
import View from '@Hi/View';
import BaseHubWindow from './BaseHubWindow';

export class IconButton extends ThemedButton {
    constructor(...children: View[]) {
        super(new HStack(...children));
        this.font('xl')
            .padding()
            .rounded()
            .background(RGBAModel.WHITE)
            .margin(10);
    }
}

export default class IconChangerPreferences extends BaseHubWindow {
    constructor() {
        super(
            'Icon Changer',
            new ScrollView(
                new VStack(
                    new SectionTitle('Back / Forward Style'),

                    new HStack(
                        new IconButton(
                            new IonIcon('arrow-back'),
                            new IonIcon('arrow-forward'),
                        ),

                        new IconButton(
                            new IonIcon('arrow-back-circle-outline'),
                            new IonIcon('arrow-forward-circle-outline'),
                        ),
                    )
                        .width('100%')
                        .alignStart(),

                    new SectionTitle('Reload Style'),

                    new HStack(
                        new IconButton(new IonIcon('refresh')),
                        new IconButton(new IonIcon('refresh-circle-outline')),
                        new IconButton(new IonIcon('reload-outline')),
                        new IconButton(new IonIcon('reload-circle-outline')),
                    )
                        .width('100%')
                        .alignStart(),

                    new SectionTitle('Hub Icon'),

                    new HStack(
                        new IconButton(new IonIcon('home-outline')),
                        new IconButton(new IonIcon('apps-outline')),
                        new IconButton(new IonIcon('grid-outline')),
                        new IconButton(new IonIcon('rocket-outline')),
                    )
                        .width('100%')
                        .alignStart(),

                    new HStack(
                        new IconButton(new IonIcon('home')),
                        new IconButton(new IonIcon('apps')),
                        new IconButton(new IonIcon('grid')),
                        new IconButton(new IonIcon('rocket')),
                    )
                        .width('100%')
                        .alignStart(),

                    new SectionTitle(''),
                ).stretch(),
            ).stretch(),
        );
    }
}
