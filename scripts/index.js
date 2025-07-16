const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileFormEl = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostImageEl = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.closeModal(editProfileModal);
}

editProfileFormEl.addEventListener("submit", handleEditProfileFormSubmit);

function handleAddNewPost(evt) {
  evt.preventDefault();
  console.log({
    image: newPostImageEl.value,
    caption: newPostCaptionInput.value,
    newPostForm.reset();
  });
  newPostModal.closeModal(newPostModal);


newPostForm.addEventListener("submit", handleAddNewPost);

newPostCloseButton.addEventListener("click", () => {
  closeModal(newPostModal);
});
