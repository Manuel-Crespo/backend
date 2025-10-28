# 🚀 Backend NestJS con Docker y PostgreSQL

Este proyecto es una API REST construida con **NestJS** y **TypeORM**, conectada a una base de datos **PostgreSQL**, totalmente contenerizada con **Docker**.

---

## 📦 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con este contenido:

```env
# Configuración de la base de datos
POSTGRES_HOST=postgres_db
POSTGRES_PORT=5432
POSTGRES_USER=nest_user
POSTGRES_PASSWORD=nest_password
POSTGRES_DB=nest_db´´´

# Puerto donde corre la API
PORT=3000

🧱 Construcción y ejecución

Para levantar toda la aplicación (API + Base de datos):

docker-compose up --build -d

Esto levantará:

nest_app → API NestJS en http://localhost:3000

postgres_db → Base de datos PostgreSQL en el puerto 5432

🧩 Migraciones (opcional)

Ejecútalas con:

docker exec -it nest_app npm run migration:run

⚠️ Si tienes synchronize: true en la configuración de TypeORM, no necesitas correr migraciones, las tablas se crearán automáticamente.

📘 Documentación Swagger

Una vez levantado el contenedor, accede a la documentación interactiva en:

👉 http://localhost:3000/api/docs

🧪 Pruebas Unitarias

Levanta los contenedores de Docker:

docker-compose up -d

Ejecuta las pruebas en el contenedor:

docker exec -it nest_app npm test

Esto correrá Jest y mostrará todos los tests unitarios.

🔗 Endpoints disponibles

🧍‍♂️ Owners (Dueños)
Método	Endpoint	Descripción
POST	/owners	Crear un nuevo dueño
GET	/owners	Obtener todos los dueños
GET	/owners/:id	Obtener un dueño por ID
DELETE	/owners/:id	Eliminar un dueño por ID

🚗 Vehicles (Vehículos)
Método	Endpoint	Descripción
POST	/vehicles	Crear un nuevo vehículo
GET	/vehicles	Obtener todos los vehículos
GET	/vehicles/:id	Obtener un vehículo por ID
GET	/vehicles/search/:plate	Buscar vehículo por placa
DELETE	/vehicles/:id	Eliminar un vehículo por ID
