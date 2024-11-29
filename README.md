# Sistema de Gestión de Biblioteca Universitaria

Este proyecto es un sistema de gestión para bibliotecas universitarias. Permite a los usuarios consultar, reservar y gestionar préstamos de libros, y a los administradores controlar el inventario y generar reportes.

## Características Principales
- Gestión de usuarios y libros.
- Registro de préstamos y devoluciones en tiempo real.
- Generación de reportes sobre inventario y préstamos.
- Interfaz web amigable para usuarios y administradores.

## Tecnologías Utilizadas
- **Backend**: Node.js
- **Base de Datos**: MySQL y MongoDB (según sea necesario).
- **Contenedores**: Docker con Docker Compose.
- **Gestión del Código**: Git.

---

## Requisitos Previos
Asegúrate de tener instalados los siguientes programas en tu sistema antes de comenzar:
- **Git**: Para clonar el repositorio.
- **Node.js y npm**: Para instalar dependencias y ejecutar el backend.
- **Docker y Docker Compose**: Para orquestar los contenedores del proyecto.

---

## Instalación y Configuración

1. Clona este repositorio en el directorio de tu preferencia:

   ```bash
   git clone https://github.com/OsvaldoMrn/BibliotecaApi.git

2. Cambia al directorio del proyecto:

   ```bash
   cd BibliotecaApi
3. Instala las dependencias de Node.js:
   ```bash
   npm install
4. Construye y levanta los contenedores usando Docker Compose:
   ```bash
   docker-compose build
   docker-compose up -d

### Detener los contenedores
Si deseas detener los contenedores, borrar el volumen utilizado y eliminar la imagen construida localmente, ejecuta:
   ```bash
   docker-compose down --rmi local -v
