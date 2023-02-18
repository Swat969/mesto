import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';

const validateSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
};

const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
const popupPlace = document.querySelector('.popup_type_new-place');
const popupImageView = document.querySelector('.popup_type_image');

const popupImage = popupImageView.querySelector('.popup__image');
const popupImageCaption = popupImageView.querySelector('.popup__image-caption');

const nameInput = document.querySelector('.popup__input_content_name-field');
const jobInput = document.querySelector('.popup__input_content_job-field');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const placeName = popupPlace.querySelector('.popup__input_content_place-name');
const imageUrl = popupPlace.querySelector('.popup__input_content_image-url');

const buttonEditProfile = document.querySelector('.profile__edit-button');

const buttonAddPlace = document.querySelector('.profile__add-button');

const formEdit = document.forms['profile_edit'];
const formPlace = document.forms['new_place'];

const popups = document.querySelectorAll('.popup');

const cardsContainer = document.querySelector('.elements__list');

function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closeOnEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_open');
    closePopup(openedPopup);
  }
}

popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

function openEditPopup() {
  openPopup(popupProfileEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editProfileFormValidator.resetValidation();
}

function openPlacePopup() {
  openPopup(popupPlace);
  formPlace.reset();
  addPlaceFormValidator.resetValidation();
}

function handleCardClick(image, caption) {
  openPopup(popupImageView);
  popupImage.src = image;
  popupImage.alt = `Изображение ${caption}`;
  popupImageCaption.textContent = caption;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  renderedCard.renderItems({ name: placeName.value, link: imageUrl.value });
  evt.target.reset();
  closePopup(popupPlace);
}

const renderedCard = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = new Card(item, '#elementTemplate', handleCardClick).setData();
    renderedCard.addItem(cardElement);
  }
}, cardsContainer);

renderedCard.renderItems();

buttonEditProfile.addEventListener('click', openEditPopup);
buttonAddPlace.addEventListener('click', openPlacePopup);

formEdit.addEventListener('submit', handleProfileFormSubmit);
formPlace.addEventListener('submit', handlePlaceFormSubmit);

const editProfileFormValidator = new FormValidator(validateSettings, popupProfileEdit);
const addPlaceFormValidator = new FormValidator(validateSettings, popupPlace);

editProfileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();
