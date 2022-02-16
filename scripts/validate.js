/* Валидация форм */

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__form-field_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error-text_visible');
};
  
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__form-field_type_error');
    errorElement.classList.remove('popup__error-text_visible');
    errorElement.textContent = '';
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};

const setEventListeners = (formElement, onlySetState = false) => {
    const buttonElement = formElement.querySelector('.popup__button-submit');
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-field'));

    inputList.forEach(inputElement => {
        if (onlySetState) {
            checkInputValidity(formElement, inputElement);
        } else {
            inputElement.addEventListener('input', () => {
                checkInputValidity(formElement, inputElement);
                toggleButtonState(inputList, buttonElement);
            });
        }
    });

    toggleButtonState(inputList, buttonElement); // инициация состояния кнопки
}

/* проверка всех полей на наличие хотя бы одной ошибки */
const hasInvalidInput = (inputList) => {
    return inputList.some( inputListElement => !inputListElement.validity.valid);
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button-submit_inactive');
    } else {
      buttonElement.classList.remove('popup__button-submit_inactive');
    }
}

const isFormError = formElement => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-field'));
    return hasInvalidInput(inputList);
}

/* -- валидация - */

enableValidation(configObj);