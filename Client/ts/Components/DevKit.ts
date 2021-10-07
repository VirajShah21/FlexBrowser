import { HColor, rgba } from '@Hi/Colors';
import View from '@Hi/View';
import ClickButton from './ClickButton';
import HStack from './HStack';
import IonIcon from './IonIcon';
import Spacer from './Spacer';
import TextView from './TextView';
import VStack from './VStack';

// ! Fix all errors with null/dnull and implement a workaround
export default class Preview extends VStack {
    private readonly dimensions: {
        width: number;
        height: number;
        padding: string;
    } = {
        width: 0,
        height: 0,
        padding: '',
    };

    private readonly componentInfo: {
        name?: string;
        id?: string;
        description?: string;
    } = {
        name: '',
        id: '',
        description: '',
    };

    private contrastToggle = false;

    constructor(content: View) {
        super(
            new HStack(
                Preview.OptionButton(
                    'toggle-contrast-button',
                    'contrast-outline',
                ).whenClicked(() => {
                    this.contrastToggle = !this.contrastToggle;
                }),
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
                        new TextView(' by '),
                        Preview.dimensionSub('height').padding(),
                    ).id('component-dimensions'),
                    new Spacer(),
                    new VStack(
                        new TextView('•').id('component-padding').font('lg'),
                        new TextView('Padding')
                            .font('sm')
                            .foreground(HColor('gray')),
                    )
                        .padding()
                        .id('component-padding-wrapper'),
                    new Spacer(),
                ),
                new HStack(
                    new VStack(
                        new TextView('•').id('component-name').font('lg'),
                        new TextView('Component')
                            .font('sm')
                            .foreground(HColor('gray')),
                    ).padding(),
                    new VStack(
                        new TextView('•').id('component-id').font('lg'),
                        new TextView('ID')
                            .font('sm')
                            .foreground(HColor('gray')),
                    ).padding(),
                ),
                new TextView('Description')
                    .font('sm')
                    .foreground(HColor('gray')),
                new TextView('•').id('component-description'),
            ).padding(),
        );

        Preview.enableHover(content, this);
    }

    override handle(data: string): void {
        if (data === 'color') {
            this.getViewsByClass('preview-canvas').forEach(canvas =>
                canvas.border({ color: HColor('gray5') }),
            );
            this.getViewsByClass('preview-options').forEach(wrapper =>
                wrapper.background(HColor('gray5')),
            );
        }
    }

    public get componentWidth(): number {
        return this.dimensions.width;
    }

    public set componentWidth(val: number) {
        this.dimensions.width = val;
        (this.findViewById('component-width') as TextView).text = `${val}`;
    }

    public get componentHeight(): number {
        return this.dimensions.height;
    }

    public set componentHeight(val: number) {
        this.dimensions.height = val;
        (this.findViewById('component-height') as TextView).text = `${val}`;
    }

    public get componentPadding(): string {
        return this.dimensions.padding;
    }

    public set componentPadding(val: string) {
        this.dimensions.padding = val;
        (this.findViewById('component-padding') as TextView).text = `${val}`;
    }

    public get componentName(): string | undefined {
        return this.componentInfo.name;
    }

    public set componentName(name: string | undefined) {
        this.componentInfo.name = name;
        (this.findViewById('component-name') as TextView).text = name || '•';
    }

    public get componentId(): string | undefined {
        return this.componentInfo.id;
    }

    public set componentId(id: string | undefined) {
        this.componentInfo.id = id;
        (this.findViewById('component-id') as TextView).text = id || '•';
    }

    public get componentDescription(): string | undefined {
        return this.componentInfo.description;
    }

    public set componentDescription(description: string | undefined) {
        this.componentInfo.description = description;
        (this.findViewById('component-description') as TextView).text =
            description || '•';
    }

    public get contrastMode(): boolean {
        return this.contrastToggle;
    }

    public set contrstMode(value: boolean) {
        this.contrastToggle = value;
        this.findViewById('toggle-contrast-button')?.foreground(
            HColor(this.contrastToggle ? 'green' : 'gray'),
        );
    }

    static enableHover(view: View, exampleViewer: Preview): void {
        const viewer = exampleViewer;
        view.whenMouseOver(ev => {
            const thisComponent = ev.view;
            viewer.componentWidth = thisComponent.body.clientWidth;
            viewer.componentHeight = thisComponent.body.clientHeight;
            viewer.componentName = thisComponent.constructor.name;
            viewer.componentId = thisComponent.body.id;
            viewer.componentDescription = thisComponent.description || '';
            const computedStyles = window.getComputedStyle(thisComponent.body);

            const paddings = [
                computedStyles.paddingTop,
                computedStyles.paddingRight,
                computedStyles.paddingBottom,
                computedStyles.paddingLeft,
            ];

            if (
                paddings[0] === paddings[1] &&
                paddings[1] === paddings[2] &&
                paddings[2] === paddings[3]
            ) {
                viewer.componentPadding = paddings[0] as string;
            } else if (
                paddings[0] === paddings[2] &&
                paddings[1] === paddings[3]
            ) {
                viewer.componentPadding = `${paddings[0]} ${paddings[1]}`;
            } else {
                viewer.componentPadding = `${paddings[0]} ${paddings[1]} ${paddings[2]} ${paddings[3]}`;
            }

            if (viewer.contrastToggle) {
                thisComponent.body.style.filter = 'brightness(50%)';
            }

            ev.browserEvent.stopPropagation();
        }).whenMouseOut(ev => {
            const thisComponent = ev.view;
            if (viewer.contrastToggle) {
                thisComponent.body.style.filter = 'brightness(100%)';
            }
        });

        view.forChild(child => {
            this.enableHover(child, viewer);
        });
    }

    static dimensionSub(axis: 'width' | 'height'): VStack {
        return new VStack(
            new TextView('•').id(`component-${axis}`).font('lg'),
            new TextView(axis === 'width' ? 'Width' : 'Height')
                .font('sm')
                .foreground(HColor('gray')),
        );
    }

    static OptionButton(id: string, icon: string): ClickButton {
        return new ClickButton(
            new IonIcon(icon).font('lg').foreground(HColor('gray')).id(id),
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
