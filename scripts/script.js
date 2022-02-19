const openEditorButton = document.querySelector('.profile__pen');
const openCardPopupButton = document.querySelector('.profile__add-button');
const body = document.querySelector('.page');

// popup-title
const popupTitle = document.querySelector('.popup_prefix_title');
const closeButtonTitle = popupTitle.querySelector('.popup__close');
const popupContainerTitle = popupTitle.querySelector('.popup__container');
const popupTitleForm = popupTitle.querySelector('.popup__form');
const nameInput = popupContainerTitle.querySelector('.popup__form-field_field_name');
const positionInput = popupContainerTitle.querySelector('.popup__form-field_field_position');
const nameTitle = document.querySelector('.profile__title');
const positionText = document.querySelector('.profile__subtitle');

// popup-card
const popupCard = document.querySelector('.popup_prefix_card');
const popupCardContainer = popupCard.querySelector('.popup__container');
const popupCardCloseButton = popupCard.querySelector('.popup__close');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupCardName = popupCard.querySelector('.popup__form-field_field_name');
const popupCardUrl = popupCard.querySelector('.popup__form-field_field_url');

// popup-image
const popupImage = document.querySelector('.popup_prefix_image');
const closeButtonImage = popupImage.querySelector('.images-full__close');
const popupImageContainer = popupImage.querySelector('.images-full__content');
const popupImageImg = popupImage.querySelector('.images-full__img');
const popupImageText = popupImage.querySelector('.images-full__text');


const template = document.querySelector('.item-template').content;
const itemContainer = document.querySelector('.elements');

function render() {
    initialCards.forEach( el => {
        const newCard = renderItem(el.name, el.link);
        renderCard(newCard, itemContainer);
    });
}

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

const handleCloseImg = evt => {
    closePopup(popupImage);
};

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

function closePopupCard() {
    closePopup(popupCard);

    // очистим поля
    popupCardName.value = '';
    popupCardUrl.value = '';
}



closeButtonImage.addEventListener('click', handleCloseImg);
popupImage.addEventListener('click', handleCloseImg);
popupImageContainer.addEventListener('click', e => e.stopPropagation());

openEditorButton.addEventListener('click', function (event) {
    openPopupTitle();
});

closeButtonTitle.addEventListener('click', function (event) {
    closePopup(popupTitle);
});

popupTitleForm.addEventListener('submit', function (event) {
    submitProfileForm(event);
});

popupTitle.addEventListener('click', function (event) {
    closePopup(popupTitle);
});

popupContainerTitle.addEventListener('click', function (event) {
    event.stopPropagation();
});

openCardPopupButton.addEventListener('click', function (event) {
    openPopup(popupCard);
});

popupCardCloseButton.addEventListener('click', function (event) {
    closePopupCard();
});

popupCard.addEventListener('click', () => {
    closePopupCard();
});

popupCardContainer.addEventListener('click', function (event) {
    event.stopPropagation();
});

popupCardForm.addEventListener('submit', function (event) {

    if (isFormError(event.target, configObj)) {
        return ;
    }
    
    const newCard = renderItem(popupCardName.value.trim(), popupCardUrl.value.trim());
    renderCard(newCard, itemContainer);
    closePopupCard();
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
