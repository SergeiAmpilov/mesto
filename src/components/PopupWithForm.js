import { Popup } from './Popup.js' ;
import { configObj } from '../constants/constants.js' ;

class PopupWithForm extends Popup {

    constructor(popupSelector, formCallbackSubmit) {
        super(popupSelector);

        this._formCallbackSubmit = formCallbackSubmit;
        this._formElement = this._popupElement.querySelector(configObj.formSelector);
        this._inputList = this._formElement.querySelectorAll(configObj.inputSelector);
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach( el => this._inputValues[el.name] = el.value );

        return this._inputValues;
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formCallbackSubmit( this._getInputValues() );
        });
        super.setEventListeners();

        return this;
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    setButtonText(buttonText) {
        this._formElement.querySelector(configObj.submitButtonSelector).innerText = buttonText;
    }

}

export { PopupWithForm };