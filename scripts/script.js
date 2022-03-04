import { Card } from './card.js';

export { Card } from './card.js';

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
            img: el.link
        }, '.item-template').generateCard();

        itemContainer.prepend(newCard);
        /*
        const newCard = renderItem(el.name, el.link);
        renderCard(newCard, itemContainer);
        */
    });
}

/*
function renderItem(name, link) {

    const newItemElement = template.cloneNode(true);
    newItemElement.querySelector('.element__title').textContent = name;

    const imgElement = newItemElement.querySelector('.element__image');
    imgElement.alt = name;
    imgElement.src = link;

    appendEvents(newItemElement);

    return newItemElement;
}

function renderCard(card, wrap) {
    wrap.prepend(card);
} 
*/
function appendEvents(element) {
    element.querySelector('.element__like').addEventListener('click', handleLikeClick);
    element.querySelector('.element__trash').addEventListener('click', handleRemoveElement);
    element.querySelector('.element__image').addEventListener('click', handleOpenImg);
}

const handleLikeClick = event => {
    event.target.classList.toggle('element__like_active');
}

const handleRemoveElement = event => {
    event.target.closest('.element').remove();
}


const handleOpenImg = event => {
    popupImageImg.src = event.target.src;
    popupImageImg.alt = event.target.alt;
    popupImageText.innerText = event.target.alt;

    openPopup(popupImage);
}

function openPopupTitle() {
    nameInput.value = nameTitle.textContent.trim();
    positionInput.value = positionText.textContent.trim();

    openPopup(popupTitle);
}

function submitProfileForm(event) {

    if (isFormError(event.target, configObj)) {
        return ;
    }

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

    if (isFormError(event.target, configObj)) {
        return ;
    }
    
    const newCard = renderItem(popupCardName.value.trim(), popupCardUrl.value.trim());
    renderCard(newCard, itemContainer);
    closePopup(popupCard);

    // очистим поля
    popupCardName.value = '';
    popupCardUrl.value = '';

    disableSubmitButton(event.target.querySelector('.popup__button-submit'));
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
