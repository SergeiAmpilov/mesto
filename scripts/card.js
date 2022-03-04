class Card {
    constructor(data, templateSelector) {
        this._cardSelector = templateSelector;
        this._title = data.title;
        this._img = data.img;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _handleLikeClick(event) {
        event.target.classList.toggle('element__like_active');
    }

    _handleRemoveElement(event) {
        event.target.closest('.element').remove();
    }

    _handleOpenImg(event) {
        /* интересный вопрос - будут ли эти  константы и функции доступны тут, если они определены в другом файле ? */
        popupImageImg.src = this._img;
        popupImageImg.alt = this._title;
        popupImageText.innerText = this._title;

        openPopup(popupImage);
    }

    /* пока стоит заглушка, не наполнил пока */
    _setEventListeners() {
        element.querySelector('.element__like').addEventListener('click', (event) => {
            this._handleLikeClick(event);
        });
        element.querySelector('.element__trash').addEventListener('click', (event) => {
            this._handleRemoveElement(event);
        });
        element.querySelector('.element__image').addEventListener('click', handleOpenImg);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._element.querySelector('.element__title').textContent = this._title;
        this._element.querySelector('.element__image').src = this._img;
        this._element.querySelector('.element__image').alt = this._title;
    
        return this._element;
    }
}


export { Card };