class FormValidator {
    constructor(configObj, formElement) {
        this._config = configObj;
        this._element = formElement;
        this._buttonElement = formElement.querySelector(configObj.submitButtonSelector);
    }

    enableValidation() {
        this._element.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        this._setEventListeners();
    }

    _setEventListeners() {
        
        this._inputList = Array.from(this._element.querySelectorAll(this._config.inputSelector));
        
        this._inputList.forEach( (inputElement) => {
                inputElement.addEventListener('input', () => {
                    this._checkInputValidity(inputElement);
                    this.toggleButtonState();
                });
        });
    
        this.toggleButtonState();
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
        const { inputErrorClass, errorClass } = this._config;
        
        inputElement.classList.add(inputErrorClass); 
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
        const { inputErrorClass, errorClass } = this._config;
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);  
        errorElement.textContent = '';

    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    }

    _hasInvalidInput() {
        return this._inputList.some( inputListElement => !inputListElement.validity.valid);
    }

    _disableSubmitButton() {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.setAttribute("disabled", "disabled");
    }

    _enableSubmitButton() {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.removeAttribute("disabled");
    }

}


export { FormValidator }