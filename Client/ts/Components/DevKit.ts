import { HColor, rgba } from '@Hi/Colors';
import { StateObject } from '@Hi/Types/states';
import View from '@Hi/View';
import Checkbox from './Checkbox';
import ClickButton from './ClickButton';
import HStack from './HStack';
import IonIcon from './IonIcon';
import Overlay from './Overlay';
import Spacer from './Spacer';
import TextContent from './TextView';
import VStack from './VStack';

// ! Fix all errors with null/dnull and implement a workaround
export class Preview extends VStack {
    public readonly dimensions = StateObject(
        {
            width: 0,
            height: 0,
            padding: '',
        },
        property => {
            if (property == 'width' || property == 'height')
                (
                    this.getViewById(`component-${property}`) as TextContent
                ).model.text =
                    (property == 'width'
                        ? this.dimensions.width
                        : this.dimensions.height) + '';
            else if (property == 'padding')
                (
                    this.getViewById('component-padding') as TextContent
                ).model.text = this.dimensions.padding || '•';
        }
    );

    public readonly componentInfo = StateObject(
        {
            name: '',
            id: '',
            description: '',
            padding: '',
            margin: '',
        },
        property => {
            switch (property) {
                case 'name':
                    (
                        this.getViewById('component-name') as TextContent
                    ).model.text = this.componentInfo.name || '•';
                    break;
                case 'id':
                    (
                        this.getViewById('component-id') as TextContent
                    ).model.text = this.componentInfo.id || '•';
                    break;
                case 'description':
                    (
                        this.getViewById('component-description') as TextContent
                    ).model.text = this.componentInfo.description || '•';
                    break;
            }
        }
    );

    public readonly viewerSettings = StateObject(
        {
            contrastToggle: false,
        },
        property => {
            if (property == 'contrastToggle')
                this.getViewById('toggle-contrast-button')?.foreground(
                    HColor(
                        this.viewerSettings.contrastToggle ? 'green' : 'gray'
                    )
                );
        }
    );

    constructor(content: View) {
        super(
            new HStack(
                Preview.OptionButton(
                    'toggle-contrast-button',
                    'contrast-outline'
                ).whenClicked(() => {
                    this.viewerSettings.contrastToggle =
                        !this.viewerSettings.contrastToggle;
                })
            )
                .rounded({
                    top: { left: 10, right: 10 },
                    bottom: { left: 0, right: 0 },
                })
                .background(HColor('gray5'))
                .addClass('preview-options'),

            new VStack(content)
                .border({ size: 4, style: 'dashed', color: HColor('gray5') })
                .borderTop({ style: 'solid' })
                .addClass('preview-canvas'),

            new VStack(
                new HStack(
                    new Spacer(),
                    new HStack(
                        Preview.dimensionSub('width').padding(),
                        new TextContent(' by '),
                        Preview.dimensionSub('height').padding()
                    ).id('component-dimensions'),
                    new Spacer(),
                    new VStack(
                        new TextContent('•').id('component-padding').font('lg'),
                        new TextContent('Padding')
                            .font('sm')
                            .foreground(HColor('gray'))
                    )
                        .padding()
                        .id('component-padding-wrapper'),
                    new Spacer()
                ),
                new HStack(
                    new VStack(
                        new TextContent('•').id('component-name').font('lg'),
                        new TextContent('Component')
                            .font('sm')
                            .foreground(HColor('gray'))
                    ).padding(),
                    new VStack(
                        new TextContent('•').id('component-id').font('lg'),
                        new TextContent('ID')
                            .font('sm')
                            .foreground(HColor('gray'))
                    ).padding()
                ),
                new TextContent('Description')
                    .font('sm')
                    .foreground(HColor('gray')),
                new TextContent('•').id('component-description')
            ).padding()
        );

        Preview.enableHover(content, this);
    }

    override handle(data: string): void {
        if (data == 'color') {
            this.getViewsByClass('preview-canvas').forEach(canvas =>
                canvas.border({ color: HColor('gray5') })
            );
            this.getViewsByClass('preview-options').forEach(wrapper =>
                wrapper.background(HColor('gray5'))
            );
        }
    }

    static enableHover(view: View, exampleViewer: Preview): void {
        view.whenMouseOver(ev => {
            exampleViewer.dimensions.width = view.body.clientWidth;
            exampleViewer.dimensions.height = view.body.clientHeight;
            exampleViewer.componentInfo.name = view.constructor.name;
            exampleViewer.componentInfo.id = view.body.id;
            exampleViewer.componentInfo.description = view.description || '';
            const computedStyles = window.getComputedStyle(view.body);

            const paddings = [
                computedStyles.paddingTop,
                computedStyles.paddingRight,
                computedStyles.paddingBottom,
                computedStyles.paddingLeft,
            ];

            if (
                paddings[0] == paddings[1] &&
                paddings[1] == paddings[2] &&
                paddings[2] == paddings[3]
            )
                exampleViewer.dimensions.padding = paddings[0] as string;
            else if (paddings[0] == paddings[2] && paddings[1] == paddings[3])
                exampleViewer.dimensions.padding = `${paddings[0]} ${paddings[1]}`;
            else
                exampleViewer.dimensions.padding = `${paddings[0]} ${paddings[1]} ${paddings[2]} ${paddings[3]}`;

            if (exampleViewer.viewerSettings.contrastToggle)
                view.body.style.filter = 'brightness(50%)';

            ev.browserEvent.stopPropagation();
        }).whenMouseOut(() => {
            if (exampleViewer.viewerSettings.contrastToggle)
                view.body.style.filter = 'brightness(100%)';
        });

        view.forChild(child => {
            this.enableHover(child, exampleViewer);
        });
    }

    static dimensionSub(axis: 'width' | 'height'): VStack {
        return new VStack(
            new TextContent('•').id(`component-${axis}`).font('lg'),
            new TextContent(axis == 'width' ? 'Width' : 'Height')
                .font('sm')
                .foreground(HColor('gray'))
        );
    }

    static OptionButton(id: string, icon: string): ClickButton {
        return new ClickButton(
            new IonIcon(icon).font('lg').foreground(HColor('gray')).id(id)
        )
            .padding({
                top: 0,
                bottom: 0,
                left: 5,
                right: 5,
            })
            .whenMouseOver(ev => {
                ev.view.background(rgba(0, 0, 0, 0.1));
            })
            .whenMouseOut(ev => {
                ev.view.background('none');
            });
    }
}
