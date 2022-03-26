import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
// import { Popup } from './Popup.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { initialCards, configObj } from './data.js';


const buttonEditor = document.querySelector('.profile__pen');
const buttonCardOpen = document.querySelector('.profile__add-button');

// popup-new
const popupTitleElement = (new PopupWithForm('.popup_prefix_title', () => {
    const inputValues = popupTitleElement._getInputValues();

    userInfo.setUserInfo(inputValues);

    // nameTitle.textContent = inputValues.name.trim();
    // positionText.textContent = inputValues.position.trim();

    popupTitleElement.close();
    validatorTitle.toggleButtonState();

})).setEventListeners();
const popupCardElement = (new PopupWithForm('.popup_prefix_card', () => {
    const inputValues = popupCardElement._getInputValues();

    const newCard = createCard(inputValues.name.trim(), inputValues.url.trim());    
    cardListSection.addItem(newCard);

    popupCardElement.close();
    validatorCard.toggleButtonState();

})).setEventListeners();
const popupImageElement = (new PopupWithImage('.popup_prefix_image')).setEventListeners();

// userinfo
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    positionSelector: '.profile__subtitle',
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

const cardListSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const newCard = createCard(item.name, item.link);
        cardListSection.addItem(newCard);        
    }
}, '.elements');
cardListSection.renderItems();

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

function createCard(title, img) {
    return new Card({
        title,
        img,
        handleCardClick: () => {
            popupImageElement.open(img, title);
        },
    }, '.item-template').generateCard();
}


/* validation */
const validatorTitle = new FormValidator(configObj, popupTitleForm);
validatorTitle.enableValidation();

const validatorCard = new FormValidator(configObj, popupCardForm);
validatorCard.enableValidation();