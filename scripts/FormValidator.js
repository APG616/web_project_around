//FormValidator.js

export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners(); // Asegura que los listeners se configuren cuando se habilite la validación
    this._toggleButtonState(); // Establece el estado del botón al iniciar
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement); // Verifica si el input es válido
        this._toggleButtonState(); // Actualiza el estado del botón en cada cambio
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage); // Muestra error si es inválido
    } else {
      this._hideInputError(inputElement); // Esconde error si es válido
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    if (errorElement) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    } else {
      console.error(
        `No se encontró el elemento de error para el input con id ${inputElement.id}.`
      );
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    if (errorElement) {
      inputElement.classList.remove(this._inputErrorClass); // Elimina la clase de error del input
      errorElement.classList.remove(this._errorClass); // Elimina la clase de error del mensaje
      errorElement.textContent = ""; // Limpia el mensaje de error
    }
  }

  _toggleButtonState() {
    const isFormValid = this._inputList.every((input) => input.validity.valid);
    if (isFormValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  }
}
