
# E-commerce Backend API

Esta API backend permite gestionar un sistema de carrito de compras y productos para una tienda en línea. 
Permite crear, leer, actualizar y eliminar productos, así como agregar productos a un carrito y obtener la información de los mismos.


## Funcionalidades


- Crear, leer, actualizar y eliminar productos.
- Crear y gestionar carritos de compras.
- Validación de entradas para productos.
- Rutas protegidas para productos y carritos.
## Dependencias

- **Node.js**: Entorno de ejecución para JavaScript.
- **express**: Framework web para Node.js.
- **fs**: Módulo nativo de Node.js para leer y escribir archivos.
- **path**: Módulo nativo de Node.js para gestionar rutas de archivos.
- **uuid**: Para generar identificadores únicos para carritos y productos.
- **Postman**: Herramienta externa para probar la API. (No es una dependencia directa del proyecto, pero se incluye para realzar las pruebas)

## Levantar el proyecto

1. Clona este repositorio:
```bash
git clone <https://github.com/MailenGasques/Proyecto-Backend.git>

2. Instala las dependencias:
npm install

3. Levanta el servidor
npm start

El proyecto se ejecutará en el puerto 8080.