# Tripleten web_project_around

1. WEB PROJECT AROUND es una pagina web interactiva, estilo red social moderna, donde el usuario puede mostrar su interés en los fotos con like y dislike, podrá agregar fotos y configurar su perfil eligiendo su nombre y su foto de perfil.

1.1. Se configuró la funcionalidad de la edicion del nombre de perfil e informacion adicional del usuario que interactúa con la plataforma.

1.2. Se diseñó de manera responsiva a la página para que se adapte a diferentes tamaños de pantalla.

2 WEB PROJECT AROUND se busca que el usuario pueda editar su feed a su voluntad, agregando o eliminando fotografías, además de llamarlas como le convenga. También que terceros puedan mostrar afinidad a las distintas imágenes que comparta el usuario.

2.1. Se agrega el botón para eliminar ("basura") las imagenes.
2.2. Se agrega el botón de like en imagenes.

2.3. Se agrega funcionalidad al botón de clase .profile\_\_add-button y códificación para poder agregar nuevas imágenes al #feed.

3.1. Se agrega validación a los formularios
3.2. Se agrega funcionalidad a Esc para cerrar los popups.
3.3. Se agrega funcionalidad para cerrar los popups haciendo click en la sobreposición.

4.1. Se modula las funciones en tres scripts
4.1.1. Card.js que produce una tarjeta con texto y un enlace a la imagen, siguiendo estos requisitos:

- Toma los datos de la tarjeta (tanto el texto como un enlace a la imagen) y un selector de elemento de plantilla como parámetros en el constructor.
- Dispone de métodos privados para trabajar con el marcado y añadir detectores de eventos.
- Tiene métodos privados para cada controlador de eventos.
- Tiene un método público que devuelve un elemento card completamente funcional y lleno de datos.

  4.1.2. FormValidator.js establece la configuración para validar los campos del formulario de acuerdo con los siguientes requisitos:

  - Tu constructor tiene dos parámetros. El primer parámetro es un objeto de configuración que almacena los selectores y las clases del formulario, y el segundo toma un elemento del formulario a validar.
  - Tiene métodos privados para procesar el formulario, que incluyen: comprobar la validez del campo, cambiar el estado del botón Submit, y agregar todos los controladores necesarios.
  - Tiene un método público enableValidation(), que activa la validación del formulario.

  4.1.3. Util.js contiene los controladores de eventos y la función que abre/cierra las ventanas modales.

  4.1.4. index.js integra todo el código modular y lo orquesta para funcionalidad completa.
