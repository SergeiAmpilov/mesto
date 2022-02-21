/* Валидация форм */

const checkInputValidity = (formElement, inputElement, configObj) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, configObj);
    } else {
        hideInputError(formElement, inputElement, configObj);
    }
};

const showInputError = (formElement, inputElement, errorMessage, configObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(configObj.inputErrorClass); 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configObj.errorClass);
};
  
const hideInputError = (formElement, inputElement, configObj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(configObj.inputErrorClass);
    errorElement.classList.remove(configObj.errorClass);  
    errorElement.textContent = '';
};

const enableValidation = (configObj) => {
    const formList = Array.from(document.querySelectorAll(configObj.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, configObj);
    });
};

const setEventListeners = (formElement, configObj = {}) => {
    const buttonElement = formElement.querySelector(configObj.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(configObj.inputSelector));
    
    inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                checkInputValidity(formElement, inputElement, configObj);
                toggleButtonState(inputList, buttonElement, configObj);
            });
    });

    toggleButtonState(inputList, buttonElement, configObj); // инициация состояния кнопки
}

/* проверка всех полей на наличие хотя бы одной ошибки */
const hasInvalidInput = (inputList) => {
    return inputList.some( inputListElement => !inputListElement.validity.valid);
}

const toggleButtonState = (inputList, buttonElement, configObj) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement);
    } else {
        enableSubmitButton(buttonElement);
    }
}

const disableSubmitButton = (buttonElement) =>  {
    buttonElement.classList.add(configObj.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
};

const enableSubmitButton = (buttonElement) =>  {
    buttonElement.classList.remove(configObj.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
};

const isFormError = (formElement, configObj) => {
    const inputList = Array.from(formElement.querySelectorAll(configObj.inputSelector));
    return hasInvalidInput(inputList);
}

/* -- валидация - */

enableValidation(configObj);