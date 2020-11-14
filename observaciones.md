Querida Agus, 

Desde el primer momento frente a tu web sabemos que estamos frente a un trabajo muy bien hecho, pero viendo en profundidad tu código, se nota realmente lo bien que está. Cumplís a la perfección todas las consignas y se nota que acá hay mucho tiempo y esfuerzo invertido. Felicitaciones!

### Accesibilidad

Tu sitio cumple casi a la perfeccion los requsitos de accesibilidad. Utilizas a la perfeccion las etiquetas semanticas, por lo que un lector de pantalla puede orientarse facilmente en tu web. Los colores y contrastes son en general adecuados y utilizas bien las etiquetas aria y el atributo alt. 

Digo "casi" porque un detalle afecta mucho la navegacion con teclado de tu web, y es la decision de ponerle "aria-hidden" al icono "fas fa-search" en los filtros. Con solo ese detale, lamentablemente toda esa seccion deja de volverse accesible para navegarse por teclado. Sacalo para que podamos volver a hacerlo. Lo mismo ocurre con el carrito de compras. 

### Filtros y búsqueda

Tus filtros funcionan a la perfeccion. No solo eso, sino que la reutilizacion en responsive es perfecta. Nada que comentar aqui: se nota que hiciste un trabajo enorme y que pusiste mucho esfuerzo en que quedaran perfectos. 

### Carrito

Tu carrito funciona muy bien, esta muy bien maquetado y cumple todos los requerimientos solicitados. Quiza la unica mejora que se me ocurre es que al borrar todos los productos deberian desaparecer los botones de comprar y vaciar; idealmente, quedaria igual que al principio cuando no habia ningun producto. Lo podes hacer en este if:

```js
 if (productosAgregadosAlCarrito.length === 0) {
```

Pero es realmente un detalle. 

### Checkout

Todo perfecto en terminos de funcionalidades. Lo unico a comentar es que tu button type="submit" esta fuera de la etiqueta <form>, por lo que no funciona para navegar con teclado (apretando enter). 

### Misc 

Es un detalle, pero cuando el input de los filtros esta en foco la lupa de busqueda aparece a la mitad del foco. Fijate de acomodar eso cambiando la posicion de la lupa. 

Tu HTML esta perfecto. Excelente la indentacion, claro, completo, con las etiquetas semanticas adecuadas. Tu CSS tambien esta muy prolijo y bien hecho, reutilizas bien los estilos y los nombres de clases son claros y descriptivos.

El responsive esta hecho a la perfeccion. 

Tengo que destacar especialmente la calidad del JS. Todos los comentarios que dejas son utiles para el lector. El orden es perfecto. Creo que encontre un solo console log olvidado, lo que es muchisimo para alguien de tu experiencia. 

Tenes muchos y muy buenos commits, y ni hablar de la calidad de tu README. Este es un trabajo del que estar muy orgullosa. 

### Nota 

En resumen, hiciste un enorme trabajo, casi ningun problema en el producto entregado y con una enorme atencion al detalle y la calidad. Solo lamento no tener mucho que ofrecerte para que mejores tu trabajo, pero poco podemos hacer los docentes frente a TPs de esta calidad. Felicitaciones de todo corazon: sin dudas Agus estas en el lugar correcto, porque si podes hacer un trabajo de esta calidad en el poquisimo tiempo de aprendizaje que tuviste, no me caben dudas de que podras aprender todo lo que necesites y lograr lo que quieras dentro del mundo del front end. 

Con respecto a los restantes factores de evaluación: 

✅ Respeta la consigna.
✅ Estructura correcta de documento HTML.
✅ Respeta el diseño dado.
✅ Respeta el funcionamiento.
✅ Responsive funciona correctamente.
✅ Buena estructura de proyecto.
✅ Código bien indentado.
✅ Comentarios que permiten mejorar la legibilidad del código.
✅ Uso correcto de etiquetas semánticas.
✅ Buenos nombres de clases.
✅ Buenos nombres de funciones y variables.
✅ Reutilización de estilos.
✅ Funciones pequeñas.
✅ Commits con mensajes adecuados.
✅  Cumple con las condiciones de accesibilidad avanzada.

NOTA FINAL: 10




