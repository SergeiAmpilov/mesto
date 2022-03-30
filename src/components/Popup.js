class Popup {

    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscCloseFunct.bind(this);
    }

    _handleEscCloseFunct(evt) {
        if (evt.key !== 'Escape') {
            return ;
        }

        this.close();
    }

    open() {
        this._popupElement.classList.add('popup_visible');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_visible');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_visible') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });

        return this;
    }
}

export { Popup };