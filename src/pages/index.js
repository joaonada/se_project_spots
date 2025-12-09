import "../pages/index.css";

import { enableValidation, validationConfig } from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";
import Api from "../utils/Api.js";
import { disableButton, resetValidation } from "../scripts/validation.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "83710e38-f595-4146-9662-24305cd63962",
    "Content-Type": "application/json",
  },
});



// PROFILE ELEMENTS
const editProfileButton = document.querySelector(".profile__edit-btn");
const addCardButton = document.querySelector(".profile__new-post-btn");
const addAvatarButton = document.querySelector(".profile__avatar-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileAvatarEl = document.querySelector(".profile__avatar");

// EDIT FORM ELEMENTS
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close");
const editFormEl = editProfileModal.querySelector(".modal__form");
const nameInputEl = editFormEl.querySelector("#profile-name-input");
const descriptionInputEl = editFormEl.querySelector(
  "#profile-description-input"
);
// CARD FORM ELEMENTS
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseBtn = addCardModal.querySelector(".modal__close");
const addCardFormEl = addCardModal.querySelector(".modal__form");
const addCardSubmitBtn = addCardModal.querySelector(".modal__button");
const captionInputEl = addCardFormEl.querySelector("#card-caption-input");
const linkInputEl = addCardFormEl.querySelector("#card-link-input");

// AVATAR FROM ELEMENTS
const addAvatarModal = document.querySelector("#avatar-profile-modal");
const addAvatarCloseBtn = addAvatarModal.querySelector(".modal__close");
const addAvatarFormEl = addAvatarModal.querySelector(".modal__form");
const addAvatarSubmitBtn = addAvatarModal.querySelector(".modal__button");
const avatarInputEl = addAvatarFormEl.querySelector("#profile-avatar-input");

// DELETE FORM ELEMENTS
const deleteModal = document.querySelector("#delete-profile-modal");
const deleteForm = deleteModal.querySelector(".modal__form");

// PREVIEW IMAGE POPUP ELEMENTS
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");
const previewImageEl = previewModal.querySelector(".modal__image");
const captionModalEl = previewModal.querySelector(".preview-caption-modal");
const previewTitleEl = document.querySelector(".modal__caption");

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

// CARD RELATED ELEMENTS
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

let selectedCard;
let selectedCardId;

api
  .getAppInfo()
  .then(([userInfo, cards]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
    profileAvatarEl.src = userInfo.avatar;
  })

  .catch(console.error);

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  cardLikeBtnEl.addEventListener("click", (evt, id) => {
    cardLikeBtnEl.classList.toggle("card__like-button_active");
  });

  let cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });

  // todo - if the card is liked, set the active class on the card
  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewTitleEl.textContent = data.name;

    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  document.addEventListener("keydown", handleEscapeKey);
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  document.removeEventListener("keydown", handleEscapeKey);
  modal.classList.remove("modal_is-opened");
}

editProfileButton.addEventListener("click", function () {
  nameInputEl.value = profileNameEl.textContent;
  descriptionInputEl.value = profileDescriptionEl.textContent;

  resetValidation(
    editFormEl,
    [nameInputEl, descriptionInputEl],
    validationConfig
  );
  openModal(editProfileModal);
});

addCardButton.addEventListener("click", function () {
  openModal(addCardModal);
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

addCardCloseBtn.addEventListener("click", function () {
  closeModal(addCardModal);
});

editFormEl.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({ name: nameInputEl.value, about: descriptionInputEl.value })
    .then((data) => {
      profileNameEl.textContent = nameInputEl.value;
      profileDescriptionEl.textContent = descriptionInputEl.value;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText.textContent = "Save";
    });
});

// todo - implement loading text for all other form submissions
addCardFormEl.addEventListener("submit", function (evt) {
  evt.preventDefault();
  handleCardSubmit(evt);
});

addAvatarButton.addEventListener("click", function () {
  openModal(addAvatarModal);
});

addAvatarFormEl.addEventListener("submit", function (evt) {
  evt.preventDefault();
  handleAvatarSubmit(evt);
});

deleteForm.addEventListener("submit", handleDeleteSubmit);

function handleCardSubmit(evt) {
  evt.preventDefault();
  const values = { name: captionInputEl.value, link: linkInputEl.value };
  api
    .addCard(values)
    .then(() => {
      const addCardEl = getCardElement(values);
      cardsList.prepend(addCardEl);
      evt.target.reset();
      disableButton(addCardSubmitBtn, validationConfig);
      closeModal(addCardModal);
    })
    .catch(console.error);
  const addCardEl = getCardElement(values);
  cardsList.prepend(addCardEl);
  evt.target.reset();
  disableButton(addCardSubmitBtn, validationConfig);
  closeModal(addCardModal);
}

// todo - finish avatar submission handler
function handleAvatarSubmit(evt) {
  // todo - prevent behavior
  console.log(avatarInputEl.value);
  api
    .editAvatarInfo(avatarInputEl.value)
    .then((data) => {
      console.log(data.avatar);
    })
    .catch(console.error);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error);
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleLike(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

enableValidation(validationConfig);
