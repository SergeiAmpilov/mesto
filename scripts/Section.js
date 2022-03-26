class Section {

    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    _clear() {
        this._container.innerHTML = '';
    }

    renderItems() {
        this._clear();
    
        this._renderedItems.forEach(item => {
          this._renderer(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }

}


export { Section };