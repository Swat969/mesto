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

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const formEdit = document.forms['profile_edit'];
const formPlace = document.forms['new_place'];

const popups = document.querySelectorAll('.popup');

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
    popups.forEach(closePopup);
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
}

function openPlacePopup() {
  openPopup(popupPlace);
}

function openImage(image, caption) {
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
  renderCard(placeName.value, imageUrl.value);
  evt.target.reset();
  closePopup(popupPlace);
}

editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openPlacePopup);

formEdit.addEventListener('submit', handleProfileFormSubmit);
formPlace.addEventListener('submit', handlePlaceFormSubmit);

const cardTemplate = document.querySelector('#elementTemplate').content;
const cardsContainer = document.querySelector('.elements__list');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');

  const cardRemoveButton = cardElement.querySelector('.element__remove-button');
  const likeButton = cardElement.querySelector('.element__like-button');

  cardElementImage.src = link;
  cardElementImage.alt = `Изображение ${name}`;
  cardElement.querySelector('.element__title').textContent = name;

  cardElementImage.addEventListener('click', () => openImage(link, name));
  cardRemoveButton.addEventListener('click', () => cardElement.remove());
  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like-button_active'));

  return cardElement;
}

function renderCard(name, link) {
  const cardElement = createCard(name, link);
  cardsContainer.prepend(cardElement);
}

initialCards.forEach((item) => renderCard(item.name, item.link));
