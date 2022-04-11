import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { configObj } from '../components/data.js';
import { Api } from '../components/Api.js';

/* img import */
import imgTrashVector from '../images/trash-vector.svg';
import imgKustoLogo from '../images/custo-logo.jpg';
import imgHeaderLogo from '../images/header-logo.svg';

//css
import './index.css';

const api = new Api();
let cardListSection = undefined;

const buttonEditor = document.querySelector('.profile__pen');
const buttonCardOpen = document.querySelector('.profile__add-button');

// popup-new
const popupTitleElement = (new PopupWithForm('.popup_prefix_title', (inputValues) => {
    api.updateProfileInfo({
        name: inputValues.name,
        about: inputValues.position
    }).then( (data) => {
        // после обновления данных на сервере обновляем данные на форме
        userInfo.setUserInfo({name: data.name, position: data.about, url: data.avatar});
        popupTitleElement.close();
        validatorTitle.toggleButtonState();
    })
})).setEventListeners();
const popupCardElement = (new PopupWithForm('.popup_prefix_card', (inputValues) => {
    api.addCard({name: inputValues.name.trim(), link: inputValues.url.trim()})
        .then((data) => {
            // когда успешно добавили на сервер карточку отрисуем в интерфейсе
            const newCard = createCard(data.name, data.link, data._id, 0, true);    
            cardListSection.addItem(newCard);

            popupCardElement.close();
            validatorCard.toggleButtonState();
        })
})).setEventListeners();
const popupImageElement = (new PopupWithImage('.popup_prefix_image')).setEventListeners();

// userinfo
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    positionSelector: '.profile__subtitle',
    iconSelector: '.profile__avatar',
});


// popup-title
const popupTitle = document.querySelector('.popup_prefix_title');
const popupContainerTitle = popupTitle.querySelector('.popup__container');
const popupTitleForm = popupTitle.querySelector('.popup__form');
const nameInput = popupContainerTitle.querySelector('.popup__form-field_field_name');
const positionInput = popupContainerTitle.querySelector('.popup__form-field_field_position');


// popup-card
const popupCard = document.querySelector('.popup_prefix_card');
const popupCardForm = popupCard.querySelector('.popup__form');

// popup-confirm
const popupConfirm = (new PopupWithForm('.popup_prefix_confirm', () => {
    api.deleteCard( configObj.cardOwner.getCardId() ).then( () => {
        configObj.cardOwner.removeFromDom()
        popupConfirm.close()
    })
})).setEventListeners();

function openPopupTitle() {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    positionInput.value = info.position;

    popupTitleElement.open();
}


buttonEditor.addEventListener('click', function (event) {
    openPopupTitle();
});


buttonCardOpen.addEventListener('click', function (event) {
    popupCardElement.open();
});

function createCard(title, img, id, likeCount, ownerId) {
    return new Card({
        title,
        img,
        id,
        likeCount,
        isMy: (ownerId === true ? ownerId : api.getMyId() == ownerId),
        handleCardClick: () => {
            popupImageElement.open(img, title);
        },
        handleRemoveClick: () => {
            popupConfirm.open();
        },
    }, '.item-template').generateCard();
}


/* validation */
const validatorTitle = new FormValidator(configObj, popupTitleForm);
validatorTitle.enableValidation();

const validatorCard = new FormValidator(configObj, popupCardForm);
validatorCard.enableValidation();

/* == API == */


api.getProfileInfo()
    .then((data) => {
        userInfo.setUserInfo({
            name: data.name,
            position: data.about,
            url: data.avatar,
        })
    })


api.getCards()
    .then( (data) => {
        cardListSection = new Section({
            items: data,
            renderer: (item) => {
                const newCard = createCard(item.name, item.link, item._id, item.likes.length, item.owner._id);
                cardListSection.addItem(newCard);        
            }
        }, '.elements');
        cardListSection.renderItems();
    })