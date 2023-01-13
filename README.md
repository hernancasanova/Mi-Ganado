# Software requerido

1. Docker compose

# Pasos para ejecutar la aplicación

1.  Ingresar a la carpeta rest y ejecutar los pasos 2,3,4,5,6
2.  Crear archivo '.env' renombrando el archivo '.env.example'
3.  Levantar servicios del stack de backend: `docker-compose up`
4.  Instalar dependencias de php: `docker-compose exec backend-miganado composer install`
5.  Generar clave de la aplicación de API: `docker-compose exec backend-miganado php artisan key:generate`
6.  Crear enlace simbolico a carpeta de imagenes: `docker-compose exec backend-miganado php artisan storage:link`
7.  Ingresar a la carpeta react-reduction ubicada en el mismo nivel que la carpeta rest y ejecutar los siguientes pasos
8.  Levantar contenedor de la aplicación de react: `docker-compose up`
9.  Acceder a la url: http://localhost:3000 para ver en funcionamiento la aplicación.
