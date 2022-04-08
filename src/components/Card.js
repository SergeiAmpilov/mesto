class Card {
    
    constructor(data, templateSelector, id) {
        this._cardSelector = templateSelector;
        this._title = data.title;
        this._img = data.img;
        this._id = data.id;
        this.likeCount = data.likeCount;

        this._handleCardClick = data.handleCardClick;
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
        console.log('card id', this._id);
    }

    _handleRemoveElement(event) {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._elementLike = this._element.querySelector('.element__like');
        this._elementTrash = this._element.querySelector('.element__trash');
        this._elementImage = this._element.querySelector('.element__image');

        this._elementLike.addEventListener('click', (event) => {
            this._handleLikeClick(event);
        });
        this._elementTrash.addEventListener('click', (event) => {
            this._handleRemoveElement(event);
        });
        this._elementImage.addEventListener('click', (event) => {
            this._handleCardClick();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._element.querySelector('.element__title').textContent = this._title;
        this._element.querySelector('.element__like-count').textContent = this.likeCount;
        this._elementImage.src = this._img;
        this._elementImage.alt = this._title;
    
        return this._element;
    }
}


export { Card };