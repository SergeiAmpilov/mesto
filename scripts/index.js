import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';

import { initialCards, configObj } from './data.js';


const buttonEditor = document.querySelector('.profile__pen');
const buttonCardOpen = document.querySelector('.profile__add-button');

// popup
const popups = document.querySelectorAll('.popup');

// popup-title
const popupTitle = document.querySelector('.popup_prefix_title');
const popupContainerTitle = popupTitle.querySelector('.popup__container');
const popupTitleForm = popupTitle.querySelector('.popup__form');
const nameInput = popupContainerTitle.querySelector('.popup__form-field_field_name');
const positionInput = popupContainerTitle.querySelector('.popup__form-field_field_position');
const nameTitle = document.querySelector('.profile__title');
const positionText = document.querySelector('.profile__subtitle');

// popup-card
const popupCard = document.querySelector('.popup_prefix_card');

const popupCardForm = popupCard.querySelector('.popup__form');
const popupCardName = popupCard.querySelector('.popup__form-field_field_name');
const popupCardUrl = popupCard.querySelector('.popup__form-field_field_url');

// popup-image
const popupImage = document.querySelector('.popup_prefix_image');

const cardListSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const newCard = createCard(item.name, item.link);
        cardListSection.addItem(newCard);        
    }
}, '.elements');
cardListSection.renderItems();

function openPopupTitle() {
    nameInput.value = nameTitle.textContent.trim();
    positionInput.value = positionText.textContent.trim();

    openPopup(popupTitle);
}

function submitProfileForm(event) {

    nameTitle.textContent = nameInput.value.trim();
    positionText.textContent = positionInput.value.trim();

    closePopup(popupTitle);
}

popups.forEach( el => {
    el.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_visible') || evt.target.classList.contains('popup__close')) {
            closePopup(el);
        }
    });
});


buttonEditor.addEventListener('click', function (event) {
    openPopupTitle();
});

popupTitleForm.addEventListener('submit', function (event) {
    submitProfileForm(event);
});

buttonCardOpen.addEventListener('click', function (event) {
    openPopup(popupCard);
});

popupCardForm.addEventListener('submit', function (event) {

    const newCard = createCard(popupCardName.value.trim(), popupCardUrl.value.trim());
    
    cardListSection.addItem(newCard);
    closePopup(popupCard);

    // очистим поля
    popupCardName.value = '';
    popupCardUrl.value = '';

    // new FormValidator(configObj, this)._disableSubmitButton(event.target.querySelector('.popup__button-submit'));
    validatorCard.toggleButtonState();
});

function createCard(title, img) {
    return new Card({
        title,
        img,
        popupImage,
        openPopup,
    }, '.item-template').generateCard();
}

function openPopup(element) {
    element.classList.add('popup_visible');
    document.addEventListener('keydown', handlePressEsc);
}

function closePopup(element) {
    element.classList.remove('popup_visible');
    document.removeEventListener('keydown', handlePressEsc);

}

// отслеживания нажатия на ESC ++
const handlePressEsc = evt => {
    if (evt.key !== 'Escape') {
        return ;
    }
    const popupOpened = document.querySelector('.popup.popup_visible');

    if (popupOpened) {
        closePopup(popupOpened);
    }
}

// render();

/* validation */

const validatorTitle = new FormValidator(configObj, popupTitleForm);
validatorTitle.enableValidation();

const validatorCard = new FormValidator(configObj, popupCardForm);
validatorCard.enableValidation();