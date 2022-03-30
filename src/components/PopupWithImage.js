import { Popup } from './Popup.js' ;

class PopupWithImage extends Popup {

    open(imgSrc, title) {
        const imgELement = this._popupElement.querySelector('.images-full__img');
        imgELement.src = imgSrc;
        imgELement.alt = title;

        this._popupElement.querySelector('.images-full__text').innerText = title;

        super.open();
    }
}

export { PopupWithImage };