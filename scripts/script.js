import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const openEditorButton = document.querySelector('.profile__pen');
const openCardPopupButton = document.querySelector('.profile__add-button');
const body = document.querySelector('.page');

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
const popupCardContainer = popupCard.querySelector('.popup__container');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupCardName = popupCard.querySelector('.popup__form-field_field_name');
const popupCardUrl = popupCard.querySelector('.popup__form-field_field_url');

// popup-image
const popupImage = document.querySelector('.popup_prefix_image');
const popupImageContainer = popupImage.querySelector('.images-full__content');
const popupImageImg = popupImage.querySelector('.images-full__img');
const popupImageText = popupImage.querySelector('.images-full__text');


const template = document.querySelector('.item-template').content;
const itemContainer = document.querySelector('.elements');

function render() {
    initialCards.forEach( el => {

        const newCard = new Card({
            title: el.name,
            img: el.link,
            popupImage,
            openPopup,
        }, '.item-template').generateCard();

        renderCard(newCard, itemContainer);
    });
}

function renderCard(card, wrap) {
    wrap.prepend(card);
} 

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
        if (evt.target.classList.contains('popup_visible')) {
            closePopup(el);
        }

        if (evt.target.classList.contains('popup__close')) {
            closePopup(el);
        }
    });
});


openEditorButton.addEventListener('click', function (event) {
    openPopupTitle();
});

popupTitleForm.addEventListener('submit', function (event) {
    submitProfileForm(event);
});

openCardPopupButton.addEventListener('click', function (event) {
    openPopup(popupCard);
});

popupCardForm.addEventListener('submit', function (event) {

    const newCard = new Card({
        title: popupCardName.value.trim(),
        img: popupCardUrl.value.trim(),
        popupImage,
        openPopup,
    }, '.item-template').generateCard();
    
    renderCard(newCard, itemContainer);
    closePopup(popupCard);

    // очистим поля
    popupCardName.value = '';
    popupCardUrl.value = '';

    new FormValidator(configObj, this)._disableSubmitButton(event.target.querySelector('.popup__button-submit'));
});

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

render();

/* validation */

Array.from(document.querySelectorAll(configObj.formSelector))
        .forEach( (formElement) => {
            const validator = new FormValidator(configObj, formElement).enableValidation();
        });
