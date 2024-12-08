// Popup.js (modificado 4 clases relacionadas)
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Método `open` de la clase Popup en Popup.js
  open() {
    this._popup.classList.add("popup_open");
    console.log("Popup abierto: ", this._popup); // Verificar en consola
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListener() {
    this._popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("popup_open") ||
        event.target.closest(".popup__close")
      ) {
        this.close();
      }
    });
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".image__photo");
    this._captionElement = this._popup.querySelector(".image__caption");
  }

  open({ link, name }) {
    if (this._imageElement && this._captionElement) {
      this._imageElement.src = link;
      this._imageElement.alt = name;
      this._captionElement.textContent = name;
      super.open();
    } else {
      console.error(
        "No se encontró el elemento de imagen o subtítulo en el popup."
      );
    }
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");

    if (!this._form) {
      throw new Error(`Formulario no encontrado en el popup: ${popupSelector}`);
    }

    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector("button[type='submit']");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListener() {
    super.setEventListener(); // Llama al setEventListener de la clase base
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this._handleConfirm) {
        this._handleConfirm(this._cardId);
      }
      this.close();
    });
  }

  close() {
    super.close();
  }
}

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleConfirm = null; // Inicializar la función de confirmación
    this._cardId = null; // Inicializar el cardId
  }

  // Establece los listeners para el formulario de confirmación
  setEventListener() {
    super.setEventListener(); // Llama al setEventListener de la clase base
    this._form.addEventListener("submit", (event) => {
      event.preventDefault(); // Previene el comportamiento por defecto
      if (this._handleConfirm) {
        this._handleConfirm(this._cardId); // Ejecuta la confirmación de eliminación con el ID de la tarjeta
      }
      this.close(); // Cierra el popup después de la confirmación
    });
  }

  // Abre el popup y configura el callback de confirmación y el ID de la tarjeta
  open(handleConfirm, cardId) {
    this._handleConfirm = handleConfirm; // Asigna la función de confirmación
    this._cardId = cardId; // Asigna el ID de la tarjeta
    super.open(); // Llama al método 'open' de la clase base
  }

  // Cierra el popup y resetea el cardId
  close() {
    super.close();
    this._cardId = null; // Resetea el cardId al cerrarse
  }
}
