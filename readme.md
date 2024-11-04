pasos para uso
crear estas variables de entorno en un archivo .env

EXPRESS_HOST="localhost"
EXPRESS_PORT=5000
MONGO_URI="mongodb://serganimon:serganimon@localhost/"
MONGO_DB="notes"
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret

despues  utiliza el comando 

 npm i

seguido a eso utiliza 

npm run dev

# Notes Application

## Descripción
La aplicación Notes es una plataforma simple pero poderosa para la creación y gestión de notas. Permite a los usuarios registrar cuentas, iniciar sesión, agregar, eliminar y filtrar notas. La aplicación está diseñada para ser intuitiva y accesible, con una interfaz limpia y funcional.

## Características
- **Registro e inicio de sesión:** Los usuarios pueden crear una cuenta y autenticarse utilizando un token JWT.
- **Agregar notas:** Los usuarios pueden agregar nuevas notas, especificando un título y contenido.
- **Eliminar notas:** Las notas se pueden eliminar deslizando hacia la izquierda.
- **Buscar y filtrar notas:** Los usuarios pueden buscar y filtrar notas basadas en el contenido y el título.
- **Interfaz de usuario atractiva:** Diseño moderno y limpio utilizando CSS y bibliotecas de terceros.

## Tecnologías Utilizadas
- **Frontend:**
  - React
  - TypeScript
  - react-router-dom
  - react-swipeable

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - Passport.js para la autenticación

- **Otras Bibliotecas:**
  - react-swipeable para la funcionalidad de deslizar
  - react-beautiful-dnd para arrastrar y soltar (opcional)

## Requisitos Previos
- Node.js (v14 o superior)
- MongoDB

## Instalación

### Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/notes-app.git
cd notes-app
