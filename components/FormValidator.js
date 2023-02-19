export default class FormValidator {
  constructor(validateSettings, formElement) {
    this._settings = validateSettings;
    this._formElement = formElement;
    this._inputList = formElement.querySelectorAll(this._settings.inputSelector);
    this._buttonElement = formElement.querySelector(this._settings.submitButtonSelector);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.popup__form-input-error_content_${inputElement.id}`);
    this._errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._settings.inputErrorClass);

  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.popup__form-input-error_content_${inputElement.id}`);
    this._errorElement.textContent = "";
    inputElement.classList.remove(this._settings.inputErrorClass);
  }

  _disableErrorInput() {
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this._disableErrorInput();
  }
}
