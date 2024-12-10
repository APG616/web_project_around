// Popup.js (modificado 4 clases relacionadas)
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_open");
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
    if (!link || !name) {
      console.error("Datos incompletos para abrir el popup:", { link, name });
      return;
    }
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
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
    super.setEventListener();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleConfirm = null;
    this._cardId = null;
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this._handleConfirm) {
        this._handleConfirm(this._cardId);
      }
      this.close();
    });
  }

  open(handleConfirm, cardId) {
    this._handleConfirm = handleConfirm;
    this._cardId = cardId;
    super.open();
  }

  close() {
    super.close();
    this._cardId = null;
  }
}
