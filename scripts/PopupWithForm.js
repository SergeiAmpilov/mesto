import { Popup } from './Popup.js' ;
import { configObj } from './data.js' ;

class PopupWithForm extends Popup {

    constructor(popupSelector, formCallbackSubmit, formElement) {
        this._formCallbackSubmit = formCallbackSubmit;
        this._formElement = formElement;
        this._inputList = this._formElement.querySelectorAll(configObj.inputSelector);

        super(popupSelector);
    }

    /* пока не понял, где это использовать */
    _getInputValues() {
        this._inputValues =  Array.from(this._inputList).map(e => e.value);

        return this._inputValues;
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', this._formCallbackSubmit);
        super.setEventListeners();
    }

    close() {

        this._inputList.forEach( el => el.value = '');
        super.close();
    }



}

export { PopupWithForm };