// Popup.js (modificado)
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
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value; // Recoge los valores usando 'name'
    });
    console.log("Datos del formulario:", formValues); // Agregar log para depuración
    return formValues;
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault(); // Impide el comportamiento por defecto
      console.log("Formulario enviado:", this._getInputValues()); // Agrega este log para verificar
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    setTimeout(() => {
      this._form.reset(); // Ahora el formulario se limpia después de cerrarlo
    }, 0);
  }
}
