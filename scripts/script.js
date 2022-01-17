let openEditorButton = document.querySelector('.profile__pen');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let saveButton = document.querySelector('.popup__button-submit');
let popupLayer = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');

let nameInput = document.querySelector('.popup__input-name');
let positionInput = document.querySelector('.popup__input-position');

let nameTitle = document.querySelector('.profile__title');
let positionText = document.querySelector('.profile__subtitle');


openEditorButton.addEventListener('click', function (event) {
    openPopup();
});

closeButton.addEventListener('click', function (event) {
    closePopup();
});

saveButton.addEventListener('click', function (event) {
    savePopup();

});

popupLayer.addEventListener('click', function (event) {
    closePopup();
});

popupContainer.addEventListener('click', function (event) {
    event.stopPropagation();
});

function closePopup() {
    popup.classList.add('popup__hidden');
}

function openPopup() {
    popup.classList.remove('popup__hidden');

    nameInput.value = nameTitle.textContent.trim();
    positionInput.value = positionText.textContent.trim();
}

function savePopup() {

    nameTitle.textContent = nameInput.value.trim();
    positionText.textContent = positionInput.value.trim();

    closePopup();
}