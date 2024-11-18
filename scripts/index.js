// Importaciones de las clases y funciones necesarias
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, closePopupOnOverlayClick } from "./utils.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import { PopupWithImage, PopupWithForm } from "./Popup.js";

// Selección de elementos del DOM
const profilePopupButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileForm = document.querySelector("#register-profile");
const feedForm = document.querySelector("#feed-profile");
const elementsContainer = document.querySelector(".elements__container");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-me");

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
const feedFormValidator = new FormValidator(validationConfig, feedForm);
profileFormValidator.enableValidation();
feedFormValidator.enableValidation();

// Datos de las tarjetas predeterminadas
const defaultCardsData = [
  { name: "Valle de Yosemite", link: "./images/elemento1.jpg" },
  { name: "Lago Louise", link: "./images/elemento2.jpg" },
  { name: "Montañas Calvas", link: "./images/elemento3.jpg" },
  { name: "Latemar", link: "./images/elemento4.jpg" },
  { name: "Parque Nacional de la Vanoise", link: "./images/elemento5.jpg" },
  { name: "Lago di Braies", link: "./images/elemento6.jpg" },
];

// Función handleCardClick para abrir el popup de imagen
function handleCardClick(name, link) {
  popupWithImage.open({ link, name });
}

// Instancia de PopupWithImage para el popup de visualización de imágenes
const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListener();

// Instancia de Section para manejar las tarjetas
const cardSection = new Section(
  {
    items: defaultCardsData,
    renderer: (cardData) => {
      const card = new Card(cardData, "#template-card", handleCardClick);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".elements__container"
);
cardSection.renderItems(); // Renderizamos las tarjetas predeterminadas al cargar la página

// Instancia de UserInfo para gestionar la información del usuario
const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: "#profile-description",
});

// Instancia de PopupWithForm para el formulario de perfil
const popupProfileForm = new PopupWithForm("#form-profile", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData["about-me"],
  });
  popupProfileForm.close();
});
popupProfileForm.setEventListener();

// Abrir el popup de perfil con datos existentes
profilePopupButton.addEventListener("click", () => {
  console.log("Botón de edición de perfil clickeado"); // Verificar en consola
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupProfileForm.open();
});

// Instancia de PopupWithForm para el formulario de nueva tarjeta
const popupAddCardForm = new PopupWithForm("#form-feed", (formData) => {
  const cardData = { name: formData.title, link: formData["img-url"] };
  const card = new Card(cardData, "#template-card", handleCardClick);
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
  popupAddCardForm.close();
});
popupAddCardForm.setEventListener();

// Abrir el popup de "nuevo lugar"
addButton.addEventListener("click", () => {
  popupAddCardForm.open();
});

// Delegación de eventos para manejo de overlay y tecla Esc
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", closePopupOnOverlayClick);
});
