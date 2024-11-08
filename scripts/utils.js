// Función para abrir popups
export function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", closePopupOnEsc);
}

// Función para cerrar popups
export function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupOnEsc);
}

// Cerrar popup al hacer click en overlay
export function closePopupOnOverlayClick(event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
}

// Cerrar popup al presionar Esc
export function closePopupOnEsc(event) {
  if (event.key === "Escape") {
    const openPopup = document.querySelector(".popup_open");
    if (openPopup) {
      closePopup(openPopup);
    }
  }
}
