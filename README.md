# Pasos para ejecutar la aplicación

1.  Clonar repositorio `git clone https://github.com/hernancasanova/appAn2.0.git`
2.  Ingresar a la carpeta rest y ejecutar los pasos 3,4,5,6,7,8,9,10
3.  Crear archivo '.env' renombrando el archivo '.env.example'
4.  Construir imagen de la API: `docker-compose build app`
5.  Levantar servicios del stack de backend: `docker-compose up -d`
6.  Instalar dependencias de php: `docker-compose exec app composer install`
7.  Generar clave de la aplicación de API: `docker-compose exec app php artisan key:generate`
8.  Ejecutar migraciones: `docker-compose exec app php artisan migrate`
9.  Ejecutar seeders: `docker-compose exec app php artisan db:seed `
10. Crear enlace simbolico a carpeta de imagenes: `docker-compose exec app php artisan storage:link`
11. Ingresar a la carpeta react-reduction ubicada en el mismo nivel que la carpeta rest y ejecutar los siguientes pasos
12. Crear contenedor de la aplicación de react e instalar dependencias: `docker-compose run --rm frontend npm install`
13. Levantar contenedor de la aplicación de react: `docker-compose up -d`
