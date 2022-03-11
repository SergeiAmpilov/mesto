class FormValidator {
    constructor(configObj, formElement) {
        this._config = configObj;
        this._element = formElement;
    }

    enableValidation() {
        this._element.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        this._setEventListeners(this._element, this._config);
    }

    _setEventListeners(formElement) {
        const buttonElement = formElement.querySelector(this._config.submitButtonSelector);
        const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
        
        inputList.forEach( (inputElement) => {
                inputElement.addEventListener('input', () => {
                    this._checkInputValidity(formElement, inputElement);
                    this._toggleButtonState(inputList, buttonElement);
                });
        });
    
        this._toggleButtonState(inputList, buttonElement, this._config); // инициация состояния кнопки
    }

    _checkInputValidity(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass); 
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }

    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);  
        errorElement.textContent = '';

    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            this._disableSubmitButton(buttonElement);
        } else {
            this._enableSubmitButton(buttonElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some( inputListElement => !inputListElement.validity.valid);
    }

    _disableSubmitButton(buttonElement) {
        buttonElement.classList.add(this._config.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "disabled");
    }

    _enableSubmitButton(buttonElement) {
        buttonElement.classList.remove(this._config.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }

}


export { FormValidator }