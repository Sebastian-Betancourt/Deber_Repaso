Proyecto Ionic + Firebase + APIs Públicas


Este proyecto fue desarrollado con Ionic Framework y utiliza Firebase Authentication para el inicio de sesión y registro de usuarios.
Además, se consumen APIs públicas para mostrar chistes y fotos aleatorias de perros y gatos.

Video: https://vm.tiktok.com/ZMAWkSkka/

Deploy: https://api-fun-app.web.app/login

Tecnologías Utilizadas
Ionic Framework (Angular)
Firebase Authentication y Hosting
APIs públicas:
JokeAPI
 — para mostrar chistes.
The Dog API
 — imágenes de perros.
The Cat API
 — imágenes de gatos.

 Registro de usuario con verificación de correo.
Inicio y cierre de sesión.
Recuperación de contraseña por correo electrónico.
Observador del estado de autenticación (para mantener sesión activa).
Consumo de APIs de chistes, perros y gatos.
Hosting del proyecto en Firebase Hosting.

🔐 Servicio de Autenticación (Firebase)
<img width="607" height="622" alt="image" src="https://github.com/user-attachments/assets/1f544217-2630-42bc-af0d-4033a7f8bea0" />
Comandos principales de Ionic

# Ejecutar la app en el navegador
ionic serve
# Agregar plataforma Android
ionic capacitor add android
# Sincronizar con Capacitor
ionic capacitor sync android
# Abrir en Android Studio
ionic capacitor open android

Generar APK (Android)
# Dentro del proyecto
ionic capacitor build android


Deploy a Firebase Hosting
# Inicializar Firebase en el proyecto
firebase init
# Compilar el proyecto
ionic build
# Desplegar al hosting
firebase deploy
