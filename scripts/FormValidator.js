class FormValidator {
    constructor(configObj, formElement) {
        this._config = configObj;
        this._element = formElement;
    }

    enableValidation() {
        this._element.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        this._setEventListeners();
    }

    _setEventListeners() {
        const buttonElement = this._element.querySelector(this._config.submitButtonSelector);
        const inputList = Array.from(this._element.querySelectorAll(this._config.inputSelector));
        
        inputList.forEach( (inputElement) => {
                inputElement.addEventListener('input', () => {
                    this._checkInputValidity(inputElement);
                    this._toggleButtonState(inputList, buttonElement);
                });
        });
    
        this._toggleButtonState(inputList, buttonElement); // инициация состояния кнопки
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
        inputElement.classList.add(this._config.inputErrorClass); 
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
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