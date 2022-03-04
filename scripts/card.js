class Card {
    constructor(data, templateSelector) {
        this._cardSelector = templateSelector;
        this._title = data.title;
        this._img = data.img;

        this._popupImg = data.popupImage;
        this._openPopup = data.openPopup;
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
        this._popupImg.querySelector('.images-full__img').src = this._img;
        this._popupImg.querySelector('.images-full__img').alt = this._title;
        this._popupImg.querySelector('.images-full__img').innerText = this._title;

        this._openPopup(this._popupImg);
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (event) => {
            this._handleLikeClick(event);
        });
        this._element.querySelector('.element__trash').addEventListener('click', (event) => {
            this._handleRemoveElement(event);
        });
        this._element.querySelector('.element__image').addEventListener('click', (event) => {
            this._handleOpenImg(event);
        });
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