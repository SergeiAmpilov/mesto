let openEditorButton = document.querySelector('.profile__pen');
let openCardPopupButton = document.querySelector('.profile__add-button');

// popup-title
let popup = document.querySelector('.popup_prefix_title');
let closeButton = popup.querySelector('.popup__close');
let popupContainer = popup.querySelector('.popup__container');
let popupForm = popup.querySelector('.popup__form');
let nameInput = popupContainer.querySelector('.popup__form-field_field_name');
let positionInput = popupContainer.querySelector('.popup__form-field_field_position');
let nameTitle = document.querySelector('.profile__title');
let positionText = document.querySelector('.profile__subtitle');

// popup-card
let popupCard = document.querySelector('.popup_prefix_card');
let popupCardContainer = popupCard.querySelector('.popup__container');
let popupCardCloseButton = popupCard.querySelector('.popup__close');
let popupCardForm = popupCard.querySelector('.popup__form');
let popupCardName = popupCard.querySelector('.popup__form-field_field_name');
let popupCardUrl = popupCard.querySelector('.popup__form-field_field_url');


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
        renderItem(initialCards[i].name, initialCards[i].link);
    }
}

function renderItem(name, link) {

    let newItemElement = template.cloneNode(true);
    newItemElement.querySelector('.element__title').textContent = name;

    let imgElement = newItemElement.querySelector('.element__image');
    imgElement.alt = name;
    imgElement.src = link;

    appendEvents(newItemElement);

    // itemContainer.appendChild(newItemElement);    
    itemContainer.prepend(newItemElement);    
}

function appendEvents(element) {
    element.querySelector('.element__like').addEventListener('click', likeClickHandler);
}

const likeClickHandler = event => {
    event.target.classList.toggle('element__like_active');

    if (event.target.classList.contains('element__like_active')) {
        event.target.src = 'images/like-vector-black.svg';
    } else {
        event.target.src = 'images/like-vector.svg';
    }
}


//////

function closePopup() {
    popup.classList.add('popup_hidden');
}

function openPopup() {
    popup.classList.remove('popup_hidden');

    nameInput.value = nameTitle.textContent.trim();
    positionInput.value = positionText.textContent.trim();
}

function savePopup(event) {

    event.preventDefault();

    nameTitle.textContent = nameInput.value.trim();
    positionText.textContent = positionInput.value.trim();

    closePopup();
}

openEditorButton.addEventListener('click', function (event) {
    openPopup();
});

closeButton.addEventListener('click', function (event) {
    closePopup();
});

popupForm.addEventListener('submit', function (event) {

    savePopup(event);
});

popup.addEventListener('click', function (event) {
    closePopup();
});

popupContainer.addEventListener('click', function (event) {
    event.stopPropagation();
});

// events for popup-card
function closePopupCard() {
    popupCard.classList.add('popup_hidden');

    // очистим поля
    popupCardName.value = '';
    popupCardUrl.value = '';

}

function openPopupCard() {
    popupCard.classList.remove('popup_hidden');
}

openCardPopupButton.addEventListener('click', function (event) {
    openPopupCard();
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
    renderItem(popupCardName.value.trim(), popupCardUrl.value.trim());
    closePopupCard();
})



///

render();