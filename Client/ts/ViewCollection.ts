import View from './View';

export default class ViewCollection extends Array<View> {
    constructor(views: View[]) {
        super();
        views.forEach(view => {
            this.push(view);
        });
    }

    // ! Whenver a call to this object is made, it should call buildChildren()
    // ! to update the View
}
