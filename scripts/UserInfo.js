class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    // Seleccionamos los elementos del DOM usando los selectores que se pasan al constructor
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  // Método para obtener la información del usuario desde la página
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  // Método para actualizar la información del usuario en la página
  setUserInfo({ name, job }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (job) {
      this._jobElement.textContent = job;
    }
  }
}

export default UserInfo;
