import { HColor } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import Spacer from '@Hi/Components/Spacer';
import TextField from '@Hi/Components/TextField';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';

export default class PartionEditor extends HStack {
    constructor(index: number) {
        super(
            new VStack(
                new TextView(`${index}`).font('lg').bold(),
                new Spacer()
            ).height('100%'),

            new Spacer(),

            new TextView('Width').padding(5),
            new TextField('-%')
                .padding(2)
                .width(40)
                .textEnd()
                .margin({ right: 10 }),

            new VStack(
                new TextView('Bounds').padding(5),
                new HStack(
                    new VStack(
                        new TextField('-px').padding(2).width(40).textEnd(),
                        new TextView('Min').padding(5)
                    ).margin({ right: 5 }),
                    new VStack(
                        new TextField('-px').padding(2).width(40).textEnd(),
                        new TextView('Max').padding(5)
                    )
                )
            ),

            new VStack(
                new TextField('0px').padding(2).width(40).textEnd(),
                new HStack(
                    new TextField('0px').padding(2).width(40).textEnd(),
                    new TextView('Body')
                        .background(HColor('background'))
                        .foreground(HColor('foreground'))
                        .font('sm')
                        .padding()
                        .margin(),
                    new TextField('0px').padding(2).width(40).textEnd()
                ),
                new TextField('0px').padding(2).width(40).textEnd()
            )
                .border({
                    size: 2,
                    style: 'solid',
                    color: HColor('background'),
                })
                .padding()
                .margin({ left: 25 })
        );

        this.background(HColor('blue'))
            .padding()
            .foreground(HColor('background'))
            .stretchWidth()
            .font('md')
            .margin({ bottom: 10 })
            .rounded()
            .height(150);
    }
}