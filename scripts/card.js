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
        this._elementLike.classList.toggle('element__like_active');
    }

    _handleRemoveElement(event) {
        this._element.remove();
    }

    _handleOpenImg(event) {       
        this._popupImg.querySelector('.images-full__img').src = this._img;
        this._popupImg.querySelector('.images-full__img').alt = this._title;
        this._popupImg.querySelector('.images-full__text').innerText = this._title;

        this._openPopup(this._popupImg);
    }

    _setEventListeners() {
        this._elementLike = this._element.querySelector('.element__like');
        this._elementTrash = this._element.querySelector('.element__trash');

        this._elementLike.addEventListener('click', (event) => {
            this._handleLikeClick(event);
        });
        this._elementTrash.addEventListener('click', (event) => {
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