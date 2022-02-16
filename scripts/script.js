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
    for (let i = 0; i < initialCards.length; i++) {
        const newCard = renderItem(initialCards[i].name, initialCards[i].link);
        renderCard(newCard, itemContainer);
    }
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
    element.querySelector('.element__like').addEventListener('click', likeClickHandler);
    element.querySelector('.element__trash').addEventListener('click', removeClickHandler);
    element.querySelector('.element__image').addEventListener('click', openImgkHandler);
}

const likeClickHandler = event => {
    event.target.classList.toggle('element__like_active');
}

const removeClickHandler = event => {
    event.target.closest('.element').remove();
}

const closeImgPopupHandler = evt => {
    closePopup(popupImage);
};

const openImgkHandler = event => {
    popupImageImg.src = event.target.src;
    popupImageImg.alt = event.target.alt;
    popupImageText.innerText = event.target.alt;

    openPopup(popupImage);
}

function openPopupTitle() {
    nameInput.value = nameTitle.textContent.trim();
    positionInput.value = positionText.textContent.trim();

    setEventListeners(popupTitle, true);
    openPopup(popupTitle);
}

function submitProfileForm(event) {
    event.preventDefault();

    if (isFormError(event.target)) {
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

/* Валидация форм */

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__form-field_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error-text_visible');
};
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__form-field_type_error');
    errorElement.classList.remove('popup__error-text_visible');
    errorElement.textContent = '';
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};

const setEventListeners = (formElement, onlySetState = false) => {
    const buttonElement = formElement.querySelector('.popup__button-submit');
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-field'));

    inputList.forEach(inputElement => {
        if (onlySetState) {
            checkInputValidity(formElement, inputElement);
        } else {
            inputElement.addEventListener('input', () => {
                checkInputValidity(formElement, inputElement);
                toggleButtonState(inputList, buttonElement);
            });
        }
    });

    toggleButtonState(inputList, buttonElement); // инициация состояния кнопки
}

/* проверка всех полей на наличие хотя бы одной ошибки */
const hasInvalidInput = (inputList) => {
    return inputList.some( inputListElement => !inputListElement.validity.valid);
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button-submit_inactive');
    } else {
      buttonElement.classList.remove('popup__button-submit_inactive');
    }
}

const isFormError = formElement => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-field'));
    return hasInvalidInput(inputList);
}

/* -- валидация - */

closeButtonImage.addEventListener('click', closeImgPopupHandler);
popupImage.addEventListener('click', closeImgPopupHandler);
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
    setEventListeners(popupCard, true);
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
    event.preventDefault();

    if (isFormError(event.target)) {
        return ;
    }
    
    const newCard = renderItem(popupCardName.value.trim(), popupCardUrl.value.trim());
    renderCard(newCard, itemContainer);
    closePopupCard();
});

function openPopup(element) {
    element.classList.add('popup_visible');
}

function closePopup(element) {
    element.classList.remove('popup_visible');

}

// отслеживания нажатия на ESC ++
function escHandler(evt) {

    if (evt.key !== 'Escape') {
        return ;
    }
    const popupOpened = document.querySelector('.popup.popup_visible');

    if (popupOpened) {
        closePopup(popupOpened);
    }
}

document.addEventListener('keydown', escHandler);

render();
enableValidation();