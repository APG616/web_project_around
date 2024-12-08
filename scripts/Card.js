// card.js
import { API_URL, TOKEN } from "./constants.js";
import { USER_ID } from "./index.js";
export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    apiUrl,
    userId,
    popupWithConfirmation,
    token
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._isLiked = data.isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this.apiUrl = apiUrl || API_URL;
    this._userId = userId;
    this._popupWithConfirmation = popupWithConfirmation;
    this.token = token || TOKEN;

    console.log("Card creada con:", {
      apiUrl: this.apiUrl,
      token: this.token,
    });
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__card")
      .cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._trashButton.addEventListener("click", () => this._openDeletePopup());
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _toggleLike() {
    if (!this.apiUrl || !this._id) {
      console.error("Error: apiUrl o id de la tarjeta no definidos.");
      return;
    }

    // Verificar si el usuario ya ha dado 'like' en esta tarjeta
    const method = this._isLiked ? "DELETE" : "PUT";
    fetch(`${this.apiUrl}/cards/${this._id}/likes`, {
      method,
      headers: { authorization: this.token },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then((updatedCard) => {
        console.log(updatedCard); // Verifica el formato de la respuesta
        if (updatedCard && Array.isArray(updatedCard.likes)) {
          const isLiked = updatedCard.likes.some(
            (user) => user._id === this._userId
          );
          this._likeCountElement.textContent = updatedCard.likes.length;
          this._isLiked = isLiked;
          this._likeButton.classList.toggle(
            "content__like_active",
            this._isLiked
          );
        } else {
          console.error(
            "La propiedad 'likes' no es un array o no está definida"
          );
        }
      })
      .catch((err) => console.error("Error al alternar 'me gusta':", err));
  }

  _openDeletePopup() {
    const handleConfirm = () => this._deleteCard();
    this._popupWithConfirmation.open(handleConfirm, this._id);
  }

  _deleteCard() {
    fetch(`${this.apiUrl}/cards/${this._id}`, {
      method: "DELETE",
      headers: { authorization: this.token },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then(() => {
        this._element.remove(); // Elimina la tarjeta del DOM
        this._element = null; // Limpia la referencia al elemento
      })
      .catch((err) => console.error("Error al eliminar tarjeta:", err));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".element__card-image");
    this._titleElement = this._element.querySelector(".content__text");
    this._likeButton = this._element.querySelector(".content__like");
    this._trashButton = this._element.querySelector(".element__trash");

    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
