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

// Configuración de la instancia de la API
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "9c1ddd42-c558-47c8-998b-47d8abba4611",
    "Content-Type": "application/json",
  },
});

// Configuración de validación
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".form__update",
  inactiveButtonClass: "form__send_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Selección de elementos del DOM
const profilePopupButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarContainer = document.querySelector(".profile__avatar-container");
const avatarImage = document.querySelector(".profile__avatar");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-me");

// Instancia para manejar la información del usuario
const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: "#profile-description",
  avatarSelector: ".profile__avatar",
});

// Función para crear tarjetas
const createCard = (data) => {
  const card = new Card(
    { ...data, userId: userInfo.getUserId() }, // Incluye el userId actual
    "#template-card",
    (name, link) => popupWithImage.open({ name, link }),
    api,
    popupWithConfirmation
  );
  return card.generateCard();
};

// Instancia de Section para manejar las tarjetas
const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      if (cardElement) cardSection.addItem(cardElement);
    },
  },
  ".elements__container"
);

// Carga las tarjetas iniciales y las renderiza
cardSection.loadAndRenderItems(api.getInitialCards.bind(api));

// Instancia de PopupWithImage para mostrar imágenes
const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListener();

// Instancia de PopupWithConfirmation para confirmar acciones
const popupWithConfirmation = new PopupWithConfirmation("#form-delete");
popupWithConfirmation.setEventListener();

// Instancia de PopupWithForm para actualizar el perfil
const popupProfileForm = new PopupWithForm("#form-profile", (formData) => {
  api
    .updateUserInfo({ name: formData.name, about: formData["about-me"] })
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

// Instancia de PopupWithForm para actualizar el avatar
const popupAvatarUpdateForm = new PopupWithForm(
  "#avatar-update",
  (formData) => {
    api
      .updateProfilePicture(formData.avatar)
      .then((userData) => {
        userInfo.setUserInfo({
          avatar: userData.avatar,
        });
        popupAvatarUpdateForm.close();
      })
      .catch((err) => console.error("Error al actualizar el avatar:", err));
  }
);
popupAvatarUpdateForm.setEventListener();

// Instancia de PopupWithForm para agregar tarjetas
const popupAddCardForm = new PopupWithForm("#form-feed", (formData) => {
  api
    .addCard({ name: formData.title, link: formData["img-url"] })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
      popupAddCardForm.close();
    })
    .catch((err) => console.error("Error al agregar tarjeta:", err));
});
popupAddCardForm.setEventListener();

// Validadores de formularios
const profileFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#register-profile")
);
const feedFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#feed-profile")
);
const avatarFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#update-avatar-form")
);

profileFormValidator.enableValidation();
feedFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// Manejo de eventos para abrir popups
profilePopupButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  popupProfileForm.open();
});

addButton.addEventListener("click", () => {
  feedFormValidator.resetValidation();
  popupAddCardForm.open();
});

avatarContainer.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  popupAvatarUpdateForm.open();
});

// Carga las tarjetas iniciales y las renderiza
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardsData, userData]) => {
    // Renders las tarjetas
    cardsData.forEach((cardData) => cardSection.renderer(cardData));

    // Actualiza la información del usuario
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
  })
  .catch((err) => console.error("Error al cargar los datos:", err));
