//index.js
// Importaciones de las clases y funciones necesarias
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import {
  PopupWithImage,
  PopupWithForm,
  PopupWithConfirmation,
} from "./Popup.js";
import Api from "./Api.js";
import { API_URL, TOKEN } from "./constants.js";

// Selección de elementos del DOM
const profilePopupButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileForm = document.querySelector("#register-profile");
const feedForm = document.querySelector("#feed-profile");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-me");
const elementsContainer = document.querySelector(".elements__container");
const avatarContainer = document.querySelector(".profile__avatar-container");
const avatarForm = document.querySelector("#update-avatar-form");
const avatarPopup = document.querySelector("#avatar-update");
const avatarInput = document.querySelector("#avatar-url");
const avatarImage = document.querySelector(".profile__avatar");
const isValidUrl = (url) => /^https?:\/\/.+/.test(url);
export let USER_ID = "";

// Configuración del popup para actualizar el avatar
const popupAvatarUpdateForm = new PopupWithForm(
  "#avatar-update",
  (formData) => {
    api
      .updateAvatar(formData.avatar) // Asegúrate de que el nombre del campo coincida
      .then((updatedUser) => {
        avatarImage.src = updatedUser.avatar; // Actualiza el DOM con el nuevo avatar
        popupAvatarUpdateForm.close();
      })
      .catch((err) => console.error("Error al actualizar el avatar:", err));
  }
);

// Lógica para abrir el popup de avatar
avatarContainer.addEventListener("click", () => {
  avatarForm.reset();
  avatarFormValidator.enableValidation();
  popupAvatarUpdateForm.open();
});

// Instancia de la API
const api = new Api({
  baseUrl: API_URL,
  headers: {
    authorization: TOKEN, // Este es el token que se pasa a la clase Api
    "Content-Type": "application/json",
  },
});

document.addEventListener("click", closePopupOnOverlayClick);

// Instancia de PopupWithImage para el popup de visualización de imágenes
const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListener();

// Instancia de PopupWithConfirmation para la eliminación de tarjetas
const popupWithConfirmation = new PopupWithConfirmation("#form-delete");
popupWithConfirmation.setEventListener();

// Crear la tarjeta

// Función para manejar la eliminación de la tarjeta
const handleDeleteCard = (id) => {
  popupWithConfirmation.open(() => {
    api
      .deleteCard(id) // Debes usar el método adecuado de la API para eliminar la tarjeta
      .then(() => {
        // Aquí puedes eliminar la tarjeta del DOM
        const cardElement = document.getElementById(id); // Suponiendo que las tarjetas tienen el id correcto
        cardElement.remove();
      })
      .catch((err) => console.error("Error al eliminar tarjeta:", err));
  });
};

const createCard = (data) => {
  const card = new Card(
    data,
    "#template-card",
    (name, link) => {
      popupWithImage.open(name, link); // Popup para abrir imágenes
    },
    API_URL,
    USER_ID,
    popupWithConfirmation,
    TOKEN
  );
  return card.generateCard();
};

// Instancia de Section para manejar las tarjetas
const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardSection.addItem(card);
    },
  },
  ".elements__container"
);

// Configuración de validación
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".form__send, .form__update",
  inactiveButtonClass: "form__send_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Instancia de FormValidator para los formularios
const profileFormValidator = new FormValidator(validationConfig, profileForm);
const feedFormValidator = new FormValidator(validationConfig, feedForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
profileFormValidator.enableValidation();
feedFormValidator.enableValidation();
avatarFormValidator.enableValidation();
// Instancia de UserInfo para gestionar la información del usuario
const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: "#profile-description",
});

// Instancia de PopupWithForm para el formulario de perfil
const popupProfileForm = new PopupWithForm("#form-profile", (formData) => {
  api
    .setUserInfo({ name: formData.name, about: formData.about })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });
      popupProfileForm.close();
    })
    .catch((err) => console.error("Error al actualizar el perfil:", err));
});

popupProfileForm.setEventListener();

// Abrir el popup de perfil con datos existentes
// Lógica para abrir el popup de perfil
profilePopupButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  feedFormValidator.enableValidation();
  popupProfileForm.open();
});

// Abre el popup de "Nuevo lugar" (Agregar tarjeta)

// Popup para agregar tarjetas
const popupAddCardForm = new PopupWithForm("#form-feed", (formData) => {
  api
    .addCard({
      name: formData.title,
      link: formData["img-url"],
    })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
      popupAddCardForm.close();
    })
    .catch((err) => console.error("Error al agregar tarjeta:", err));
});
popupAddCardForm.setEventListener();

addButton.addEventListener("click", () => {
  feedForm.reset();
  feedFormValidator.enableValidation();
  popupAddCardForm.open();
});

// Función de cierre del popup al hacer clic en el overlay
function closePopupOnOverlayClick(event) {
  if (event.target.classList.contains("popup_opened")) {
    event.target.classList.remove("popup_opened");
  }
}

// Delegación de eventos para manejar el clic en el overlay y la tecla Esc
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
      popup.classList.remove("popup_opened");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    popupOpened?.classList.remove("popup_opened");
  }
});

// Obtener datos iniciales del usuario y tarjetas
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    USER_ID = userData._id; // Guardar el ID del usuario
    initialCards.forEach((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement); // Añadir las tarjetas al contenedor
    });

    // Actualizar la información del usuario y el avatar
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    avatarImage.src = userData.avatar;
  })
  .catch((err) => {
    console.error("Error al cargar la información:", err);
  });
