export const validateSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_error',
};

export const popupProfileEdit = document.querySelector('.popup_type_profile-edit');
export const popupPlace = document.querySelector('.popup_type_new-place');
export const popupImageView = document.querySelector('.popup_type_image');

export const popupImage = popupImageView.querySelector('.popup__image');
export const popupImageCaption = popupImageView.querySelector('.popup__image-caption');

export const nameInput = document.querySelector('.popup__input_content_name-field');
export const jobInput = document.querySelector('.popup__input_content_job-field');

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

export const placeName = popupPlace.querySelector('.popup__input_content_place-name');
export const imageUrl = popupPlace.querySelector('.popup__input_content_image-url');

export const buttonEditProfile = document.querySelector('.profile__edit-button');

export const buttonAddPlace = document.querySelector('.profile__add-button');

export const formEdit = document.forms['profile_edit'];
export const formPlace = document.forms['new_place'];

export const popups = document.querySelectorAll('.popup');

export const cardsContainer = document.querySelector('.elements__list');
