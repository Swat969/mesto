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
const buttonEditProfileSubmit = popupProfileEdit.querySelector('.popup__save-button');

const buttonAddPlace = document.querySelector('.profile__add-button');
const buttonAddPlaceSubmit = popupPlace.querySelector('.popup__save-button');

const formEdit = document.forms['profile_edit'];
const formPlace = document.forms['new_place'];

const popups = document.querySelectorAll('.popup');
const errorMessages = document.querySelectorAll('.popup__form-input-error');
const popupInputFields = document.querySelectorAll('.popup__input')

const cardTemplate = document.querySelector('#elementTemplate').content;
const cardsContainer = document.querySelector('.elements__list');

function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', сloseOnEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', сloseOnEscape);
}

function сloseOnEscape(evt) {
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
  toggleButtonState({validity: {valid: true}},buttonEditProfileSubmit,validateSettings);
  disableErrorMessages();
  disableErrorInput(popupInputFields);
}

function openPlacePopup() {
  openPopup(popupPlace);
  formPlace.reset();
  toggleButtonState(popupInputFields,buttonAddPlaceSubmit,validateSettings);
  disableErrorMessages();
  disableErrorInput(popupInputFields);
}

function openImage({ name, link }) {
  openPopup(popupImageView);
  popupImage.src = link;
  popupImage.alt = `Изображение ${name}`;
  popupImageCaption.textContent = name;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  renderCard({ name: placeName.value, link: imageUrl.value });
  evt.target.reset();
  closePopup(popupPlace);
}

function createCard(cardData) {
  const { name, link } = cardData;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');

  const cardRemoveButton = cardElement.querySelector('.element__remove-button');
  const likeButton = cardElement.querySelector('.element__like-button');

  cardElementImage.src = link;
  cardElementImage.alt = `Изображение ${name}`;
  cardElement.querySelector('.element__title').textContent = name;

  cardElementImage.addEventListener('click', () => openImage(cardData));
  cardRemoveButton.addEventListener('click', () => cardElement.remove());
  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like-button_active'));

  return cardElement;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsContainer.prepend(cardElement);
}

buttonEditProfile.addEventListener('click', openEditPopup);
buttonAddPlace.addEventListener('click', openPlacePopup);

formEdit.addEventListener('submit', handleProfileFormSubmit);
formPlace.addEventListener('submit', handlePlaceFormSubmit);

initialCards.forEach((item) => renderCard(item));
