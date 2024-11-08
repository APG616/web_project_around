// Card.js
export default class Card {
  constructor(data, cardSelector) {
    this._text = data.text;
    this._imageLink = data.imageLink;
    this._cardSelector = cardSelector;
  }

  // Método para obtener el template del card
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element__card")
      .cloneNode(true);
    return cardElement;
  }

  // Método privado para establecer los manejadores de eventos
  _setEventListeners() {
    this._element
      .querySelector(".content__like")
      .addEventListener("click", () => {
        this._handleLike();
      });
    this._element
      .querySelector(".element__trash-remove")
      .addEventListener("click", () => {
        this._handleDelete();
      });
    this._element
      .querySelector(".element__card-image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }

  // Método privado para manejar el botón de "like"
  _handleLike() {
    this._element.querySelector(".content__like").classList.toggle("liked");
  }

  // Método privado para manejar el botón de "delete"
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  // Método privado para manejar el click en la imagen (aquí iría la lógica del popup)
  _handleImageClick() {
    // Aquí puedes llamar a una función para abrir el popup de imagen y pasarle la URL y texto
    console.log(`Abriendo imagen: ${this._imageLink}`);
  }

  // Método público que crea la tarjeta y retorna el elemento
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__card-image").src = this._imageLink;
    this._element.querySelector(".element__card-image").alt = this._text;
    this._element.querySelector(".content__text").textContent = this._text;

    this._setEventListeners();
    return this._element;
  }
}
