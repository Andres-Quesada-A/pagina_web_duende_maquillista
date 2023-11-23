# Duende Maquillista

¡Bienvenido al repositorio oficial de Duende Maquillista!, tiene como objetivo crear una plataforma web única para la maquillista conocida como Duende Maquillista. Este README proporciona una visión completa del proyecto, desde la tecnología utilizada hasta los detallados requerimientos funcionales y no funcionales.

Visita la página web: [Link](https://duendemaquillista.azurewebsites.net/)

## Web Stack

El sistema se desarrolla utilizando un stack tecnológico robusto y eficiente:

- **Front end:** React.js (HTML, CSS, JavaScript)
- **Back end:** Node.js con Express.js
- **Alojamiento del servidor:** Microsoft Azure
- **Base de datos:** Microsoft SQL Server (MSSQL) y Firebase Storage
- **Alojamiento de la base de datos:** Somee.com
- **Sistema operativo:** Linux

## Requerimientos Funcionales

| ID  | Descripción  |
|----|--------------|
| RF01 | Registro de usuarios con información básica (correo electrónico y contraseña). |
| RF02 | Inicio de sesión para usuarios registrados con correo electrónico y contraseña. |
| RF03 | Carga de imágenes de trabajos de maquillaje con descripciones, fechas y etiquetas (#tags). |
| RF04 | Organización de imágenes en categorías y subcategorías definibles por la empresaria. |
| RF05 | Edición de etiquetas asociadas a las imágenes, incluyendo adición, modificación o eliminación. |
| RF06 | Exploración de contenido visual por categorías y subcategorías, con visualización de imágenes y descripciones. |
| RF07 | Búsqueda de imágenes por palabras clave, fechas y etiquetas (#tags), con aplicación de filtros para refinar resultados. |
| RF08 | Selección de imágenes para enviar referencias a la empresaria, junto con texto, para solicitar servicios. |
| RF09 | Carga de productos de belleza y accesorios en la tienda, con detalles completos, precios y estado de disponibilidad. |
| RF10 | Gestión del carrito de compras para usuarios autenticados, con capacidad para agregar, modificar y eliminar productos. |
| RF11 | Finalización de la compra desde el carrito, con proporcionar dirección de entrega, imagen del comprobante de pago y pago mediante Sinpe Móvil. |
| RF12 | Registro de cada compra bajo un número de pedido con detalles del contenido, imagen del comprobante de pago y fecha estimada de entrega. |
| RF13 | Adición de compromisos en la agenda relacionados con servicios de maquillaje, cursos, talleres y entregas de compras. |
| RF14 | Visualización diferenciada de compromisos en la agenda según el tipo (servicio, curso, entrega). |
| RF15 | Registro de datos del cliente para servicios de maquillaje, incluyendo notas y referencias visuales. |
| RF16 | Almacenamiento persistente del carrito de compra del usuario en la página web para continuar en visitas posteriores. |
| RF17 | Acceso restringido a ciertas funciones (tienda y carrito de compras) solo para usuarios autenticados. |
| RF18 | Notificaciones y recordatorios para usuarios sobre compromisos y pedidos en la plataforma. |
| RF19 | Implementación de medidas de seguridad para proteger datos del usuario, transacciones y privacidad de información personal. |
| RF20 | Registro de eventos en la agenda, incluyendo información como fecha, hora, duración y asunto, con posibilidad de editar y eliminar entradas. |
| RF21 | Notificación y gestión de posibles traslapes entre eventos en la agenda. |
| RF22 | Restricción de colisiones para entradas del tipo "servicio de maquillaje", asegurando que no se superpongan con otros eventos. |
| RF23 | Visualización flexible de la agenda, permitiendo explorar contenido diario, semanal o mensual según las necesidades de la empresaria. |

## Requerimientos No Funcionales

| ID  | Descripción  |
|----|--------------|
| RNF01 | Plataforma receptiva con tiempos de carga rápidos y escalabilidad para gestionar el aumento de usuarios y contenido. |
| RNF02 | Utilización de medidas de seguridad sólidas, como cifrado SSL, para proteger la información del usuario y las transacciones. |
| RNF03 | Cumplimiento de regulaciones de privacidad de datos, como el RGPD. |
| RNF04 | Disponibilidad 24/7 con mínimo tiempo de inactividad programado para mantenimiento. |
| RNF05 | Escalabilidad horizontal para manejar mayor tráfico y crecimiento de datos de manera eficiente. |
| RNF06 | Interfaz de usuario intuitiva, fácil de usar, con diseño atractivo y accesible en navegadores web y dispositivos móviles. |
| RNF07 | Compatibilidad con múltiples sistemas operativos, navegadores web y dispositivos, incluyendo teléfonos móviles y tabletas. |
| RNF08 | Copias de seguridad regulares de datos y plan de recuperación de desastres en caso de pérdida de datos. |
| RNF09 | Plan de mantenimiento regular, actualizaciones y soporte técnico para usuarios y empresaria. |

## Contribuyentes

- Luis Fernando Molina Peraza
- José Andrés Quesada Artavia
- Paúl Rodríguez García
- Fabián Vargas Salazar

Agradecemos tu interés y contribuciones a Duende Maquillista. ¡Disfruta explorando y mejorando este emocionante proyecto!
