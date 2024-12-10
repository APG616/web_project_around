// card.js
export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    api,
    popupWithConfirmation
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id; // ID del creador de la tarjeta
    this._userId = data.userId; // ID del usuario actual
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._popupWithConfirmation = popupWithConfirmation;
  }

  // Método para obtener la plantilla de la tarjeta
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__card")
      .cloneNode(true);
    return cardElement;
  }

  // Método para manejar el botón "like"
  _handleLikeButton() {
    const isLiked = this._likeButton.classList.contains("content__like_active");

    this._api
      .toggleLike(this._id, isLiked)
      .then((updatedCard) => {
        this._likes = updatedCard.likes; // Actualiza los likes con los datos del servidor
        this._renderLikes(); // Renderiza el contador de likes
      })
      .catch((err) => console.error("Error al manejar el like:", err));
  }

  // Método para manejar la eliminación
  _handleDeleteButton() {
    this._popupWithConfirmation.open(() => {
      this._api
        .deleteCard(this._id)
        .then(() => {
          this._element.remove(); // Elimina la tarjeta del DOM
          this._element = null;
          this._popupWithConfirmation.close(); // Cierra el popup
        })
        .catch((err) => console.error("Error al eliminar la tarjeta:", err));
    });
  }

  // Método para configurar eventos
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeButton());
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () =>
        this._handleDeleteButton()
      );
    }
    this._imageElement.addEventListener("click", () =>
      this._handleCardClick({ name: this._name, link: this._link })
    );
  }

  // Método para renderizar el contador de likes
  _renderLikes() {
    this._likeCount.textContent = this._likes.length;
    if (this._likes.some((user) => user._id === this._userId)) {
      this._likeButton.classList.add("content__like_active");
    } else {
      this._likeButton.classList.remove("content__like_active");
    }
  }

  // Método público para eliminar la tarjeta (para integraciones externas)
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Método público para generar la tarjeta
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".content__like");
    this._deleteButton = this._element.querySelector(".element__trash");
    this._imageElement = this._element.querySelector(".element__card-image");
    this._likeCount = this._element.querySelector(".content__like-count");

    this._element.querySelector(".content__text").textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    // Oculta el botón de eliminar si el usuario no es el propietario
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }

    this._renderLikes(); // Renderiza los likes iniciales
    this._setEventListeners(); // Configura los eventos

    return this._element;
  }
}
