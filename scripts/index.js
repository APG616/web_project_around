// Importaciones de las clases y funciones necesarias
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, closePopupOnOverlayClick } from "./utils.js";

// Selección de elementos del DOM
const profilePopupButton = document.querySelector(".profile__edit-button");
const profilePopupCloseButton = document.querySelector(".popup__close");
const profilePopup = document.querySelector("#form-profile");

const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-me");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

const addButton = document.querySelector(".profile__add-button");
const feedPopupCloseButton = document.querySelector(".close__feed");
const feedPopup = document.querySelector("#form-feed");

const feedForm = document.querySelector("#feed-profile");
const profileForm = document.querySelector("#register-profile");

const titleInput = document.querySelector("#title");
const imgUrlInput = document.querySelector("#img-url");
const elementsContainer = document.querySelector(".elements__container");

// Configuración de validación
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".form__send, .form__update",
  inactiveButtonClass: "form__send_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Instancias de FormValidator
const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const feedFormValidator = new FormValidator(validationConfig, feedForm);
feedFormValidator.enableValidation();

// Función para manejar la apertura del popup de perfil y rellenar los valores actuales
profilePopupButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileDescription.textContent.trim();
  openPopup(profilePopup);
});

// Cerrar el popup de perfil al hacer clic en el botón de cerrar
profilePopupCloseButton.addEventListener("click", () => {
  closePopup(profilePopup);
});

// Actualizar la información de perfil con los valores ingresados
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value.trim();
  profileDescription.textContent = jobInput.value.trim();
  closePopup(profilePopup);
});

// Abrir el popup de "nuevo lugar"
addButton.addEventListener("click", () => {
  openPopup(feedPopup);
});

// Cerrar el popup de "nuevo lugar" al hacer clic en el botón de cerrar
feedPopupCloseButton.addEventListener("click", () => {
  closePopup(feedPopup);
});

// Crear y agregar una nueva tarjeta al contenedor de tarjetas
feedForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const cardData = {
    name: titleInput.value.trim(),
    link: imgUrlInput.value.trim(),
  };

  const card = new Card(cardData, "#template-card");
  elementsContainer.append(card.generateCard());

  // Limpiar los campos de entrada y cerrar el popup
  titleInput.value = "";
  imgUrlInput.value = "";
  closePopup(feedPopup);
});

// Delegación de eventos para manejo de overlay y tecla Esc
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", closePopupOnOverlayClick);
});
