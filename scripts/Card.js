export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._containerElement = this._element.querySelector(
      ".elements__container"
    );
    this._imageElement = this._element.querySelector(".element__card-image");
    this._titleElement = this._element.querySelector(".content__text");
    this._likeButton = this._element.querySelector(".content__like");
    this._trashButton = this._element.querySelector(".element__trash");
    this._isEscapeListenerAdded = false;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__card")
      .cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => this._toggleLike());
    } else {
      console.error("No se encontró el botón de 'like' en la tarjeta.");
    }

    if (this._trashButton) {
      this._trashButton.addEventListener("click", () => this._deleteCard());
    } else {
      console.error("No se encontró el botón de 'trash' en la tarjeta.");
    }

    if (this._imageElement) {
      this._imageElement.addEventListener("click", () =>
        this._handlePreviewPicture()
      );
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
    // Configuramos la imagen y el texto de la tarjeta
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    // Agregamos los event listeners
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

      // Aseguramos que el evento de cierre con 'Escape' solo se añada una vez
      if (!this._isEscapeListenerAdded) {
        this._handleEscape = (event) => {
          if (event.key === "Escape") {
            imagePopup.classList.remove("popup_open");
          }
        };
        document.addEventListener("keydown", this._handleEscape);
        this._isEscapeListenerAdded = true;
      }
    } else {
      console.error("No se encontraron los elementos del popup de imagen.");
    }
  }
}
