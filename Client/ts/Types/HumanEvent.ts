import View from '@Hi/View';

/**
 * An object holding the details of a triggered event
 *
 * @export
 * @interface HumanEvent
 */
export default interface HumanEvent {
    view: View;
    type: string;
    browserEvent: Event;
}

export interface HumanKeyPressEvent {
    view: View;
    type: 'KeyPress';
    browserEvent: Event;
    key: string;
}
