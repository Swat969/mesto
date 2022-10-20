const validateSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
};

function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.popup__form-input-error_content_${inputElement.id}`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(settings.inputErrorClass);

}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.popup__form-input-error_content_${inputElement.id}`);
  errorElement.textContent = "";
  inputElement.classList.remove(settings.inputErrorClass);
}

function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled')
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

function disableErrorMessages() {
  errorMessages.forEach(validMessage => validMessage.textContent = "");
}

function disableErrorInput(inputErrors) {
  inputErrors.forEach(inputError => inputError.classList.remove('popup__input_error'));
}

function setEventListeners(formElement, settings) {
  const inputList = formElement.querySelectorAll(settings.inputSelector);
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    })
  })
}

function enableValidation(settings) {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
}

enableValidation(validateSettings);
