export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Método para establecer los items y renderizarlos
  setItems(items) {
    this._items = items;
    this.renderItems();
  }

  // Método para renderizar todos los elementos
  renderItems() {
    this._container.innerHTML = ""; // Limpia el contenedor antes de renderizar
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Método para agregar un nuevo elemento al principio del contenedor
  addItem(element) {
    this._container.prepend(element);
  }
}
