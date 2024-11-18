// Section.js
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //array de datos agregados a la página
    this._renderer = renderer; //función para crear y renderizar datos
    this._container = document.querySelector(containerSelector); //selector del container que agrega elementos
  }

  //método púb para renderizar todos los elementos en la página
  renderItems() {
    this._items.forEach((item) => this._renderer(item)); // Aquí cambiaste 'renderer' por '_renderer'
  }

  //método púb que agrega nuevos elementos
  addItem(element) {
    this._container.prepend(element);
  }
}
