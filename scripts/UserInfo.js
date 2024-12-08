//UserInfo.js
class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);

    if (!this._nameElement || !this._jobElement) {
      console.error(
        "Error: No se encontraron los elementos de perfil. Verifica los selectores."
      );
      throw new Error("Elementos de perfil no encontrados.");
    }
  }

  // Obtiene la información actual del usuario
  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      job: this._jobElement.textContent.trim(),
    };
  }

  // Actualiza los datos de perfil
  setUserInfo({ name, job }) {
    console.log("Actualizando perfil con:", { name, job }); // Log de depuración
    if (name && typeof name === "string") {
      this._nameElement.textContent = name;
    } else {
      console.warn("Nombre inválido. No se actualizó.");
    }

    if (job && typeof job === "string") {
      this._jobElement.textContent = job;
    } else {
      console.warn("Trabajo inválido. No se actualizó.");
    }
  }
}

export default UserInfo;
