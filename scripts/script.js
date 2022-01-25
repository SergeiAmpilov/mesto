let openEditorButton = document.querySelector('.profile__pen');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let popupContainer = popup.querySelector('.popup__container');
let poupForm = popup.querySelector('.popup__form');

let nameInput = popupContainer.querySelector('.popup__input-name');
let positionInput = popupContainer.querySelector('.popup__input-position');

let nameTitle = document.querySelector('.profile__title');
let positionText = document.querySelector('.profile__subtitle');
let likeItems = document.querySelectorAll('.element__like');


function closePopup() {
    popup.classList.add('popup_hidden');
}

function openPopup() {
    popup.classList.remove('popup_hidden');

    nameInput.value = nameTitle.textContent.trim();
    positionInput.value = positionText.textContent.trim();
}

function savePopup() {

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

poupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    savePopup();
});

popup.addEventListener('click', function (event) {
    closePopup();
});

popupContainer.addEventListener('click', function (event) {
    event.stopPropagation();
});

for (let i=0; i<likeItems.length; i++) {
    likeItems[i].addEventListener('click', function (event) {

        this.classList.toggle('element__like-active');

        if (this.classList.contains('element__like-active')) {
            this.src = 'images/like-vector-black.svg';
        } else {
            this.src = 'images/like-vector.svg';
        }
    })
}