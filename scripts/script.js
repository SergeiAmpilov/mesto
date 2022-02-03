let openEditorButton = document.querySelector('.profile__pen');
let openCardPopupButton = document.querySelector('.profile__add-button');
let body = document.querySelector('.page');

// popup-title
let popupTitle = document.querySelector('.popup_prefix_title');
let closeButtonTitle = popupTitle.querySelector('.popup__close');
let popupContainerTitle = popupTitle.querySelector('.popup__container');
let popupForm = popupTitle.querySelector('.popup__form');
let nameInput = popupContainerTitle.querySelector('.popup__form-field_field_name');
let positionInput = popupContainerTitle.querySelector('.popup__form-field_field_position');
let nameTitle = document.querySelector('.profile__title');
let positionText = document.querySelector('.profile__subtitle');

// popup-card
let popupCard = document.querySelector('.popup_prefix_card');
let popupCardContainer = popupCard.querySelector('.popup__container');
let popupCardCloseButton = popupCard.querySelector('.popup__close');
let popupCardForm = popupCard.querySelector('.popup__form');
let popupCardName = popupCard.querySelector('.popup__form-field_field_name');
let popupCardUrl = popupCard.querySelector('.popup__form-field_field_url');

// popup-image
let popupImage = document.querySelector('.popup_prefix_image');
let closeButtonImage = popupImage.querySelector('.images-full__close');
let popupImageContainer = popupImage.querySelector('.images-full__content');
let popupImageImg = popupImage.querySelector('.images-full__img');
let popupImageText = popupImage.querySelector('.images-full__text');


const template = document.querySelector('.item-template').content;
const itemContainer = document.querySelector('.elements');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function render() {
    for (let i = 0; i < initialCards.length; i++) {
        const newCard = renderItem(initialCards[i].name, initialCards[i].link);
        renderCard(newCard, itemContainer);
    }
}

function renderItem(name, link) {

    let newItemElement = template.cloneNode(true);
    newItemElement.querySelector('.element__title').textContent = name;

    let imgElement = newItemElement.querySelector('.element__image');
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

////
const closeImgPopupHandlet = evt => {
    closePopup(popupImage);
};

const openImgkHandler = event => {
    popupImageImg.src = event.target.src;
    popupImageImg.alt = event.target.alt;
    popupImageText.innerText = event.target.alt;

    openPopup(popupImage);
}

closeButtonImage.addEventListener('click', closeImgPopupHandlet);
popupImage.addEventListener('click', closeImgPopupHandlet);
popupImageContainer.addEventListener('click', e => e.stopPropagation());


//////

function openPopupTitle() {
    
    nameInput.value = nameTitle.textContent.trim();
    positionInput.value = positionText.textContent.trim();

    openPopup(popupTitle);
}

function submitProfileForm(event) {
    event.preventDefault();

    nameTitle.textContent = nameInput.value.trim();
    positionText.textContent = positionInput.value.trim();

    closePopup(popupTitle);
}

openEditorButton.addEventListener('click', function (event) {
    openPopupTitle();
});

closeButtonTitle.addEventListener('click', function (event) {
    closePopup(popupTitle);
});

popupForm.addEventListener('submit', function (event) {
    submitProfileForm(event);
});

popupTitle.addEventListener('click', function (event) {
    closePopup(popupTitle);
});

popupContainerTitle.addEventListener('click', function (event) {
    event.stopPropagation();
});

// events for popup-card
function closePopupCard() {
    closePopup(popupCard);

    // очистим поля
    popupCardName.value = '';
    popupCardUrl.value = '';
}

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
    event.preventDefault();
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

render();