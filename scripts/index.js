const initialCards = [
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
const editFormEl = editProfileModal.quarySelector(".modal__form");
const nameInputEl = editFormEl.querySelector("#profile-name-input");
const descriptionInputEl = editFormEl.querySelector("#profile-description-input");

const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const addCardFormEl = addCardModal.querySelector(".modal__form");
const captionInputEl = addCardFormEl.querySelector("#card-caption-input");
const linkInputEl = addCardFormEl.querySelector("#card-link-input");

editProfileButton.addEventListener("click", function () {
  nameInputEl.value = profileNameEl.textContent;
  descriptionInputEl.value = profileDescriptionEl.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

addCardButton.addEventListener("click", function () {
  addCardModal.classList.add("modal_is-opened");
});

editProfileCloseButton.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

addCardCloseButton.addEventListener("click", function () {
  addCardModal.classList.remove("modal_is-opened");
});

editFormEl.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileNameEl.textContent = nameInputEl.value;
  profileDescriptionEl.textContent = descriptionInputEl.value;
  editProfileModal.classList.remove("modal_is-opened");
});

addCardFormEl.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log(captionInputEl.value);
  console.log(linkInputEl.value);

  addCardModal.classList.remove("modal_is-opened");
});







// const editProfileFormEl = editProfileModal.querySelector(".modal__form");
// const editProfileNameInput = editProfileModal.querySelector(
//   "#profile-name-input"
// );
// const editProfileDescriptionInput = editProfileModal.querySelector(
//   "#profile-description-input"
// );

// const newPostButton = document.querySelector(".profile__add-button");
// const newPostModal = document.querySelector("#new-post-modal");
// const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
// const newPostForm = newPostModal.querySelector(".modal__form");
// const newPostImageEl = newPostModal.querySelector("#card-image-input");
// const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");

// editProfileButton.addEventListener("click", function () {
//   editProfileNameInput.value = profileNameEl.textContent;
//   editProfileDescriptionInput.value = profileDescriptionEl.textContent;
//   openModal(editProfileModal);
// });

// editProfileCloseButton.addEventListener("click", function () {
//   closeModal(editProfileModal);
// });

// function closeModal(modal) {
//   modal.classList.remove("modal_is-opened");
// }

// newPostButton.addEventListener("click", function () {
//   openModal(newPostModal);
// });

// function openModal(modal) {
//   modal.classList.add("modal_is-opened");
// }


// function handleEditProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileNameEl.textContent = editProfileNameInput.value;
//   profileDescriptionEl.textContent = editProfileDescriptionInput.value;
//   closeModal(editProfileModal);
// }

// editProfileFormEl.addEventListener("submit", handleEditProfileFormSubmit);

// function handleAddNewPost(evt) {
//   evt.preventDefault();
//   console.log({
//     image: newPostImageEl.value,
//     caption: newPostCaptionInput.value,
//   });

//     newPostForm.reset();
//   closeModal(newPostModal);
// }

// newPostForm.addEventListener("submit", handleAddNewPost);

// newPostCloseButton.addEventListener("click", () => {
//   closeModal(newPostModal);
// });


initialCards.forEach(function (item) {
  console.log(item.name);
  console.log(item.link);
});

