// Api.js
import { USER_ID } from "./index.js";

export default class Api {
  constructor({ baseUrl, headers = {} }) {
    this.baseUrl = baseUrl;
    this.headers = headers; // Asegúrate de que el token se pase correctamente aquí
  }

  // Actualizar avatar del usuario
  updateAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: avatarUrl }),
    })
      .then(this.checkResponse)
      .then((data) => {
        if (data.avatar) {
          return data;
        } else {
          throw new Error("No se pudo actualizar el avatar");
        }
      });
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  // Obtener tarjetas iniciales
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this.checkResponse);
  }

  // Obtener información del usuario
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this.checkResponse);
  }

  // Actualizar información del usuario
  setUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    }).then(this.checkResponse);
  }

  // Añadir una nueva tarjeta
  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, link }),
    }).then(this.checkResponse);
  }

  // Eliminar una tarjeta
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.checkResponse);
  }

  // Alternar 'me gusta' en una tarjeta
  toggleLike(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method,
      headers: this.headers,
    }).then(this.checkResponse);
  }
}
