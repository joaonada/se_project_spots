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

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__new-post-button");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close");
const editFormEl = editProfileModal.querySelector(".modal__form");
const nameInputEl = editFormEl.querySelector("#profile-name-input");
const descriptionInputEl = editFormEl.querySelector("#profile-description-input");

const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseBtn = addCardModal.querySelector(".modal__close");
const addCardFormEl = addCardModal.querySelector(".modal__form");
const captionInputEl = addCardFormEl.querySelector("#card-caption-input");
const linkInputEl = addCardFormEl.querySelector("#card-link-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");
const previewImageEl = previewModal.querySelector(".modal__image");
const captionImageEl = previewImageEl.querySelector(".preview-caption-image");
const linkImageEl = previewImageEl.querySelector(".preview-link-image");


const cardTemplate = document
  .querySelector("#card-template").content
  .querySelector(".card");
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

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
    cardElement = null;
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
  modal.classList.add("modal_is-opened");
}

function closeModal (modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileButton.addEventListener("click", function () {
  nameInputEl.value = profileNameEl.textContent;
  descriptionInputEl.value = profileDescriptionEl.textContent;
  //editProfileModal.classList.add("modal_is-opened");
  openModal(editProfileModal);
});

addCardButton.addEventListener("click", function () {
  addCardModal.classList.add("modal_is-opened");
  openModal(newpostModal);
});

editProfileCloseButton.addEventListener("click", function () {
  //editProfileModal.classList.remove("modal_is-opened");
  closeModal(editProfileModal);
});

previewModalCloseButton.addEventListener("click", function () {
  closeModal(previewModal);
});

addCardCloseButton.addEventListener("click", function () {
  addCardModal.classList.remove("modal_is-opened");
  //closeModal(newPostModal);
});

//newPostCloseButton.addEventListener("click", function () {
  //newPostModal.classList.remove("modal_is-opened");
  //closeModal(newPostModal);
//});

editFormEl.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileNameEl.textContent = nameInputEl.value;
  profileDescriptionEl.textContent = descriptionInputEl.value;
  editProfileModal.classList.remove("modal_is-opened");
  //closeModal(editProfileModal);
});

addCardFormEl.addEventListener("submit", function (evt) {
  evt.preventDefault();
   //console.log(captionInputEl.value);
   //console.log(linkInputEl.value);

  const inputValues = {
    name: captionInputEl.value,
    link: linkInputEl.value,
  };

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);

  addCardModal.classList.remove("modal_is-opened");
  //closeModal(newPostModal);
});

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

