const profilePopupButton = document.querySelector(".profile__edit-button"); // Botón para abrir el popup de edición
const profilePopupCloseButton = document.querySelector(".popup__close"); // Botón para cerrar el popup
const profilePopup = document.querySelector("#form-profile"); // Popup de edición del perfil
const nameInput = document.querySelector("#name"); // Campo de entrada del nombre
const jobInput = document.querySelector("#about-me"); // Campo de entrada de la descripción
const profileName = document.querySelector("#profile-name"); // Elemento donde se muestra el nombre del perfil
const profileDescription = document.querySelector("#profile-description"); // Elemento donde se muestra la descripción del perfil

// Abrir el popup y cargar los valores actuales del perfil en los inputs
profilePopupButton.addEventListener("click", function () {
  // Rellenar los inputs con los valores actuales del perfil
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileDescription.textContent.trim();

  // Mostrar el popup
  profilePopup.classList.add("popup_open");
});

// Cerrar el popup
function handleClosePopup() {
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

// Botón de cierre del popup
profilePopupCloseButton.addEventListener("click", handleClosePopup);

// Enviar el formulario y actualizar el perfil
const formElement = document.querySelector(".popup__form");

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault(); // Evitar el comportamiento por defecto del formulario

  // Actualizar los valores del perfil
  profileName.textContent = nameInput.value.trim();
  profileDescription.textContent = jobInput.value.trim();

  // Cerrar el popup después de actualizar el perfil
  handleClosePopup();
});
