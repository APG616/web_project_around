const profilePopupButton = document.querySelector(".profile__edit-button");
const displayWindow = document.querySelectorAll(".popup");
const profilebuttonClose = document.querySelectorAll(".popup__close");
const profilePopup = document.querySelector("#form-profile");
const nameInput = document.querySelector(".popup__input");
const jobInput = document.querySelector(".form__about-me");
const profileButton = document.querySelector("#edit-submit");

profilePopupButton.addEventListener("click", function () {
  profilePopup.classList.add("popup_open");
});

function handleClosePopup(evt) {
  profilePopup.classList.remove("popup_open");
  resetValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".form__send",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
}
profilebuttonClose[0].addEventListener("click", handleClosePopup);

profilePopupAdd.addEventListener("click", function () {
  cardPopup.classList.add("popup_opened");
});

function handleClosePopupAdd(evt) {
  cardPopup.classList.remove("popup_opened");
  resetValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".form__send",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
}
