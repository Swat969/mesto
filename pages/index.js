import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import {
  validateSettings,
  popupProfileEdit,
  popupPlace,
  popupImageView,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  buttonEditProfile,
  buttonAddPlace,
  formEdit,
  formPlace,
  cardsContainer
} from '../utils/constants.js';

import { initialCards } from '../components/cardsData.js'

const userInfo = new UserInfo({
  name: profileName,
  job: profileJob
})

const imageView = new PopupWithImage(popupImageView);
const profileEditForm = new PopupWithForm(popupProfileEdit, formEdit, handleProfileFormSubmit);
const addCardForm = new PopupWithForm(popupPlace, formPlace, handlePlaceFormSubmit);

imageView.setEventListeners();
profileEditForm.setEventListeners();
addCardForm.setEventListeners();

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  profileEditForm.close();
}

function handlePlaceFormSubmit(data) {
  renderedCard.renderItems({ name: data.place, link: data.url });
  addCardForm.close();
}

buttonEditProfile.addEventListener('click', () => {
  profileEditForm.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  editProfileFormValidator.resetValidation();
})

buttonAddPlace.addEventListener('click', () => {
  addCardForm.open();
  formPlace.reset();
  addPlaceFormValidator.resetValidation();
})

const renderedCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = new Card(item, '#elementTemplate', imageView).setData();
    renderedCard.addItem(cardElement);
  }
}, cardsContainer);

renderedCard.renderItems();

const editProfileFormValidator = new FormValidator(validateSettings, popupProfileEdit);
const addPlaceFormValidator = new FormValidator(validateSettings, popupPlace);

editProfileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();

