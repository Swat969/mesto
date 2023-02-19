import Popup from './Popup.js';
import {
  nameInput,
  jobInput,
  placeName,
  imageUrl,
} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, submitFormFunction) {
    super(popupSelector);
    this._formSelector = formSelector;
    this._submitFormFunction = submitFormFunction;
  }

  _getInputValues() {
    return {
      name: nameInput.value,
      job: jobInput.value,
      place: placeName.value,
      url: imageUrl.value
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormFunction(this._getInputValues());
    });
  }

  close() {
    super.close();
  }
}
