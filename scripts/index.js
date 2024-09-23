const popupContainer = document.querySelector("#form-profile");
const profileButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const inputName = document.querySelector("#name");
const inputDescription = document.querySelector("#about-me");
const formProfile = document.querySelector("#form-profile");
const nameInput = document.querySelector(".form__name");
const closeButton = document.querySelector(".popup__close");

function handleOpenProfile(evt) {
  popupContainer.classList.add(".popup__open");
}

function handleCloseProfile(evt) {
  popupContainer.classList.remove(".popup__open");
}

profileButton.addEventListener("click", handleOpenProfile);

closeButton.addEventListener("click", handleCloseProfile);

formProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileHobbie.textContent = inputHobbie.value;
  handleCloseProfile();
});
