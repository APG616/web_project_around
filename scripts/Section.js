//Section.js
export default class Section {
  constructor({ renderItems }, containerSelector) {
    this._renderItems = renderItems; // Función para renderizar cada elemento
    this._container = document.querySelector(containerSelector); // Contenedor en el DOM
    this._items = []; // Array inicial para almacenar los elementos
  }

  // Establece y guarda los elementos iniciales
  setItems(items) {
    this._items = items; // Almacena los elementos
    this.renderItems(); // Renderiza los elementos
  }

  // Método para renderizar los elementos almacenados
  renderItems() {
    this._container.innerHTML = ""; // Limpia el contenedor antes de renderizar
    this._items.forEach((item) => {
      this._renderItems(item); // Llama al renderer para cada elemento
    });
  }

  // Agrega un elemento nuevo al principio del contenedor
  addItem(element) {
    this._container.prepend(element); // Prepend agrega al inicio del contenedor
  }

  // Método para cargar y renderizar elementos desde una fuente externa (API)
  loadAndRenderItems(apiMethod) {
    apiMethod()
      .then((items) => {
        this.setItems(items); // Guarda y renderiza los elementos devueltos por la API
      })
      .catch((err) =>
        console.error(`Error al cargar y renderizar los elementos: ${err}`)
      );
  }
}
