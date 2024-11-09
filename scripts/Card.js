export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".element__card-image");
    this._titleElement = this._element.querySelector(".content__text");
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__card")
      .cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".content__like");
    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => {
        this._toggleLike();
      });
    } else {
      console.error("No se encontró el botón de 'like' en la tarjeta.");
    }

    this._trashButton = this._element.querySelector(".element__trash");
    if (this._trashButton) {
      this._trashButton.addEventListener("click", () => {
        this._deleteCard();
      });
    } else {
      console.error("No se encontró el botón de 'trash' en la tarjeta.");
    }

    if (this._imageElement) {
      this._imageElement.addEventListener("click", () => {
        this._handlePreviewPicture();
      });
    } else {
      console.error("No se encontró el elemento de imagen en la tarjeta.");
    }
  }

  _toggleLike() {
    this._likeButton.classList.toggle("liked");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _handlePreviewPicture() {
    const popupImage = document.querySelector("#popup-image");
    const popupCaption = document.querySelector("#popup-caption");
    const imagePopup = document.querySelector("#image-popup");

    if (popupImage && popupCaption && imagePopup) {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupCaption.textContent = this._name;

      imagePopup.classList.add("popup_open");
      if (!this._isEscapeListenerAdded) {
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            imagePopup.classList.remove("popup_open");
          }
        });
        this._isEscapeListenerAdded = true;
      }
    } else {
      console.error("No se encontraron los elementos del popup de imagen.");
    }
  }
}
