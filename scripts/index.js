// Variables de los popups
const profilePopupButton = document.querySelector(".profile__edit-button"); // Botón para abrir el popup del perfil
const profilePopupCloseButton = document.querySelector(".popup__close"); // Botón para cerrar el popup del perfil
const profilePopup = document.querySelector("#form-profile"); // Popup de edición del perfil

const nameInput = document.querySelector("#name"); // Campo de entrada del nombre
const jobInput = document.querySelector("#about-me"); // Campo de entrada de la descripción
const profileName = document.querySelector("#profile-name"); // Elemento donde se muestra el nombre del perfil
const profileDescription = document.querySelector("#profile-description"); // Elemento donde se muestra la descripción del perfil

const addButton = document.querySelector(".profile__add-button"); // Botón para abrir el popup del feed
const feedPopupCloseButton = document.querySelector(".close__feed"); // Botón para cerrar el popup del feed
const feedPopup = document.querySelector("#form-feed"); // Popup de actualización del feed

// Seleccionamos el formulario y los campos de entrada
const feedForm = document.querySelector("#feed-profile");
const titleInput = document.querySelector("#title");
const imgUrlInput = document.querySelector("#img-url");
const elementsContainer = document.querySelector(".elements__container");

// Variables de popup imagen
const imagePopup = document.querySelector("#image-popup");
const popupImage = document.querySelector("#popup-image");
const popupCaption = document.querySelector("#popup-caption");
const closeImagePopupButton = document.querySelector("#close-image");

// Abrir popup del perfil y rellenar los valores actuales
profilePopupButton.addEventListener("click", function () {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileDescription.textContent.trim();
  profilePopup.classList.add("popup_open");
});

// Cerrar popup del perfil
profilePopupCloseButton.addEventListener("click", function () {
  profilePopup.classList.remove("popup_open");
});

// Enviar formulario del perfil y actualizar la información
const formElement = document.querySelector(".popup__form");

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault(); // Evitar el comportamiento por defecto del formulario

  // Actualizar los valores del perfil
  profileName.textContent = nameInput.value.trim();
  profileDescription.textContent = jobInput.value.trim();

  // Cerrar el popup después de actualizar el perfil
  profilePopup.classList.remove("popup_open");
});

// Abrir popup del feed
addButton.addEventListener("click", function () {
  feedPopup.classList.add("popup_open"); // Añadimos la clase que muestra el popup
});

// Cerrar popup del feed
feedPopupCloseButton.addEventListener("click", function () {
  feedPopup.classList.remove("popup_open"); // Quitamos la clase que oculta el popup
});

feedForm.addEventListener("submit", function (evt) {
  evt.preventDefault(); // Prevenir el envío predeterminado del formulario

  // Obtener el valor del título y la URL de la imagen
  const titleValue = titleInput.value.trim();
  const imageValue = imgUrlInput.value.trim();

  // Verificamos que los campos no estén vacíos
  if (titleValue === "" || imageValue === "") {
    alert("Por favor, completa ambos campos.");
    return;
  }

  // Crear un nuevo elemento (tarjeta) para la imagen
  const newCard = document.createElement("li");
  newCard.classList.add("element__card");

  newCard.innerHTML = `
    <button class="element__trash" type="button">
      <img class="element__trash element__trash-remove" src="./images/trashButton.png" alt="Botón de eliminar" />
    </button>
    <img src="${imageValue}" alt="${titleValue}" class="element__card-image" />
    <div class="element__content">
      <p class="content__text">${titleValue}</p>
      <button class="content__like" aria-label="Me gusta">
        <img src="./images/like.jpg" alt="Botón de me gusta" />
      </button>
    </div>
  `;

  // Agregar la nueva tarjeta al contenedor
  elementsContainer.appendChild(newCard);

  // Limpiar los campos del formulario
  titleInput.value = "";
  imgUrlInput.value = "";

  // Cerrar el popup del feed
  feedPopup.classList.remove("popup_open");
});

// Función para eliminar una tarjeta
function handleDeleteCard(event) {
  const deleteButton = event.target.closest(".element__trash-remove"); // Obtenemos el botón de eliminar
  if (deleteButton) {
    const card = deleteButton.closest(".element__card"); // Obtenemos la tarjeta (li) correspondiente
    if (card) {
      card.remove(); // Eliminamos la tarjeta
      console.log("Tarjeta eliminada");
    }
  }
}

// Función para alternar el estado de "Me gusta"
function handleLikeCard(event) {
  const likeButton = event.target.closest(".content__like"); // Obtenemos el botón de "Me gusta"
  if (likeButton) {
    likeButton.classList.toggle("liked"); // Alternamos la clase 'liked' para cambiar el estilo
    console.log("Like toggled");
  }
}

// Delegación de eventos en el contenedor principal
elementsContainer.addEventListener("click", function (event) {
  handleDeleteCard(event); // Llamada a la función de eliminar tarjeta
  handleLikeCard(event); // Llamada a la función de "Me gusta"
});

// Abrir popup de imagen
function openImagePopup(event) {
  const cardImage = event.target.closest(".element__card-image");

  if (cardImage) {
    const imageURL = cardImage.src;
    // Asignar nombre según .element__content más cercanos a la imagen
    const contentElement = cardImage
      .closest(".element__card")
      .querySelector(".content__text");
    const imageCaption = contentElement ? contentElement.textContent : ""; // Extraer el texto de .content__text

    // Asignar URL y descripción de la imagen al popup
    popupImage.src = imageURL;
    popupImage.alt = imageCaption; // Asignar texto como alternativa de la imagen
    popupCaption.textContent = imageCaption; // Mostrar contenido del título en popup

    //Verificar apertura de popup
    console.log("Abriendo popup de imagen", imageURL);

    // Mostrar popup
    imagePopup.classList.add("popup_open");
  }
}

// Cerrar popup de imagen
closeImagePopupButton.addEventListener("click", function () {
  console.log("Cerrando popup de imagen"); // Verifica que se dispare el evento
  imagePopup.classList.remove("popup_open");
});

// Delegar el evento para abrir el popup de imagen
elementsContainer.addEventListener("click", function (event) {
  openImagePopup(event);
});
