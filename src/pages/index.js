import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { configObj } from '../constants/constants.js';
import { Api } from '../components/Api.js';

/* img import */
import imgTrashVector from '../images/trash-vector.svg';
import imgKustoLogo from '../images/custo-logo.jpg';
import imgHeaderLogo from '../images/header-logo.svg';

//css
import './index.css';

const api = new Api();
const cardListSection = new Section( (item) => {
        const newCard = createCard(
            item.name,
            item.link,
            item._id,
            item.likes.length,
            item.owner._id,
            item.likes.filter( element => element._id == userInfo.getUserId()).length
            );
        
        cardListSection.addItem(newCard);        
    } , '.elements');

const buttonEditor = document.querySelector('.profile__pen');
const buttonCardOpen = document.querySelector('.profile__add-button');

const avatarImg = document.querySelector('.profile__avatar')

// userinfo
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    positionSelector: '.profile__subtitle',
    iconSelector: '.profile__avatar',
});

// popup-new
const popupTitleElement = (new PopupWithForm('.popup_prefix_title', (inputValues) => {
    popupTitleElement.setButtonText('Сохранение...')
    api.updateProfileInfo({
        name: inputValues.name,
        about: inputValues.position
    }).then( (data) => {
        // после обновления данных на сервере обновляем данные на форме
        userInfo.setUserInfo({name: data.name, position: data.about, url: data.avatar});
        popupTitleElement.close();
        validatorTitle.toggleButtonState();
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
        popupTitleElement.setButtonText('Сохранить')
    })

})).setEventListeners();
const popupCardElement = (new PopupWithForm('.popup_prefix_card', (inputValues) => {
    popupCardElement.setButtonText('Сохранение...')
    api.addCard({name: inputValues.name.trim(), link: inputValues.url.trim()})
        .then((data) => {
            // когда успешно добавили на сервер карточку отрисуем в интерфейсе
            const newCard = createCard(data.name, data.link, data._id, 0, true);    
            cardListSection.addItem(newCard);

            popupCardElement.close();
            validatorCard.toggleButtonState();
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
        .finally(() => {
            popupCardElement.setButtonText('Создать')
        })
})).setEventListeners();
const popupImageElement = (new PopupWithImage('.popup_prefix_image')).setEventListeners();
const popupAvatar = (new PopupWithForm('.popup_prefix_avatar', (inputValues) => {
    popupAvatar.setButtonText('Сохранение...')
    api.updateAvatar(inputValues.url)
        .then( (data) => {
            // теперь нужно поставить новый аватар
            userInfo.refreshAvatarOnForm(data.avatar)
            popupAvatar.close()
            popupTitleElement.setButtonText('Сохранить')
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
        .finally(() => {
            popupAvatar.setButtonText('Сохранить')
        })
})).setEventListeners()




// popup-title
const popupTitle = document.querySelector('.popup_prefix_title');
const popupContainerTitle = popupTitle.querySelector('.popup__container');
const popupTitleForm = popupTitle.querySelector('.popup__form');
const nameInput = popupContainerTitle.querySelector('.popup__form-field_field_name');
const positionInput = popupContainerTitle.querySelector('.popup__form-field_field_position');


// popup-card
const popupCard = document.querySelector('.popup_prefix_card');
const popupCardForm = popupCard.querySelector('.popup__form');

// popup-confirm
const popupConfirm = (new PopupWithForm('.popup_prefix_confirm', () => {
    api.deleteCard( configObj.cardOwner.getCardId() )
        .then( () => {
            configObj.cardOwner.removeFromDom()
            popupConfirm.close()
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
})).setEventListeners();

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

function createCard(title, img, id, likeCount, ownerId, isLiked = false) {
    return new Card({
        title,
        img,
        id,
        likeCount,
        isLiked,
        isMy: (ownerId === true ? ownerId : userInfo.getUserId() == ownerId),
        handleCardClick: () => {
            popupImageElement.open(img, title);
        },
        handleRemoveClick: () => {
            popupConfirm.open();
        },
        likeClick: () => {
            return api.like(id)
                    .catch(err => console.log(`Ошибка.....: ${err}`))
        },
        unlikeClick: () => {
            return api.unlike(id)
                    .catch(err => console.log(`Ошибка.....: ${err}`))
        }
    }, '.item-template').generateCard();
}

const buttonAvatarEditor = document.querySelector('.profile__avatar-button');

avatarImg.addEventListener('mouseover', (evt) => {
    toggleButtonAvatarEditor(true)
})

buttonAvatarEditor.addEventListener('mouseout', (evt) => {
    toggleButtonAvatarEditor(false)
})

buttonAvatarEditor.addEventListener('click', (evt) => {
    popupAvatar.open()
})

const toggleButtonAvatarEditor = (isVisible) => {
    buttonAvatarEditor.style.visibility = isVisible ? 'visible' : 'hidden';
    // console.log(buttonAvatarEditor.style)
}

/* validation */
const validatorTitle = new FormValidator(configObj, popupTitleForm);
validatorTitle.enableValidation();

const validatorCard = new FormValidator(configObj, popupCardForm);
validatorCard.enableValidation();

const validatorAvatar = new FormValidator(configObj, document.querySelector('.popup_prefix_avatar .popup__form'));
validatorAvatar.enableValidation();

/* == API == */
Promise.all([
    api.getProfileInfo(),
    api.getCards()
])
.then( ([profileData, cardList]) => {
    /* profile */
    const myProfileId = profileData._id;
    userInfo.setUserInfo({
        name: profileData.name,
        position: profileData.about,
        url: profileData.avatar,
        id: profileData._id,
    })

    /* cards */
    cardListSection.renderItems(cardList);
})
.catch(err => console.log(`Ошибка.....: ${err}`))