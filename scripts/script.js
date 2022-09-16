const profileName = document.querySelector('#profile__name');
const profileJob = document.querySelector('#profile__job');
const editButton = document.querySelector('#profile__edit-button');

const popup = document.querySelector('#popup');
const formElement = document.querySelector('#popup__form');
const nameInput = document.querySelector('#popup__name-input');
const jobInput = document.querySelector('#popup__job-input');
const popupClose = document.querySelector('#popup__close');

function openPopup() {
  popup.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupCloseButton (event) {
  popup.classList.remove('popup_open');
}

editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', popupCloseButton);

function formSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupCloseButton();
}

formElement.addEventListener('submit', formSubmitHandler);
