const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// PROFILE ELEMENTS
const editProfileButton = document.querySelector(".profile__edit-btn");
const addCardButton = document.querySelector(".profile__new-post-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

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

// PREVIEW IMAGE POPUP ELEMENTS
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");
const previewImageEl = previewModal.querySelector(".modal__image");
const captionModalEl = previewModal.querySelector(".preview-caption-modal");
const previewTitleEl = document.querySelector(".modal__caption");

const modals = document.querySelectorAll('.modal');
modals.forEach((modal) => {
  modal.addEventListener('click', (evt) => {
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
};

// CARD RELATED ELEMENTS
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-button_active");
  });

  let cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

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

 resetValidation(editFormEl, [nameInputEl, descriptionInputEl], settings);
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
  profileNameEl.textContent = nameInputEl.value;
  profileDescriptionEl.textContent = descriptionInputEl.value;
  closeModal(editProfileModal);
});

addCardFormEl.addEventListener('submit', function(evt) {
  evt.preventDefault();
  handleCardSubmit(evt);
});

function handleCardSubmit(evt) {
  evt.preventDefault();
  const values = { name: captionInputEl.value, link: linkInputEl.value };
  const addCardEl = getCardElement(values);
  cardsList.prepend(addCardEl);
  evt.target.reset();
  disableButton(addCardSubmitBtn, settings);
  closeModal(addCardModal);
}

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
