import { configObj } from '../constants/constants.js'

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
        this._likeClick = data.likeClick;
        this._unlikeClick = data.unlikeClick;

        this._isLiked = data.isLiked; /* начальное состояние лайка */
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

        this._isLiked = !this._isLiked;

        if (this._isLiked) {
            this._likeClick().then( (data) => {
                this.likeCount = data.likes.length;
                this._refreshLikeCount()
                return data
            })
        } else {
            this._unlikeClick().then( (data) => {
                this.likeCount = data.likes.length;
                this._refreshLikeCount()
                return data
            })
        }

        // set new likes count

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
        this._elementLike = this._element.querySelector('.element__like');
        this._elementImage = this._element.querySelector('.element__image');
        
        this._element.querySelector('.element__title').textContent = this._title;
        this._refreshLikeCount()
        this._elementImage.src = this._img;
        this._elementImage.alt = this._title;

        if (this._isLiked) {
            // установим изначальное состояние лайка
            this._elementLike.classList.add('element__like_active');
        }

        this._setEventListeners();
    
        return this._element;
    }

    getCardId() {
        return this._id;
    }

    _refreshLikeCount() {
        this._element.querySelector('.element__like-count').textContent = this.likeCount;

    }
}


export { Card };