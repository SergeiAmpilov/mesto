import { configObj } from './data.js'

class Card {
    
    constructor(data, templateSelector) {
        this._cardSelector = templateSelector;
        this._title = data.title;
        this._img = data.img;
        this._id = data.id;
        this._isMy = data.isMy;
        this.likeCount = data.likeCount;

        this._handleCardClick = data.handleCardClick;
        this._handleRemoveClick = data.handleRemoveClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        if ( !this._isMy ) {
            cardElement.querySelector('.element__trash').remove();
        }

        return cardElement;
    }

    _handleLikeClick(event) {
        this._elementLike.classList.toggle('element__like_active');
        // console.log('card id', this._id);
    }

    _handleRemoveElement(event) {
        configObj.cardOwner = this;
        this._handleRemoveClick()
    }

    removeFromDom() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._elementLike = this._element.querySelector('.element__like');
        this._elementImage = this._element.querySelector('.element__image');

        this._elementLike.addEventListener('click', (event) => {
            this._handleLikeClick(event);
        });
        
        this._elementImage.addEventListener('click', (event) => {
            this._handleCardClick();
        });

        if (this._isMy) {
            this._elementTrash = this._element.querySelector('.element__trash');
            this._elementTrash.addEventListener('click', (event) => {
                this._handleRemoveElement(event);
            });
        }
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

    getCardId() {
        return this._id;
    }
}


export { Card };