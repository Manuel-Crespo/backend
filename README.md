Backend - Gestión de Vehículos y Propietarios
📌 Descripción

Esta API REST permite gestionar vehículos y sus propietarios, con funcionalidades para:

Registrar, listar y eliminar propietarios.

Registrar, listar, eliminar vehículos y vincularlos con propietarios.

Búsqueda de vehículos por placa parcial.

Documentación de endpoints vía Swagger.

Migraciones de base de datos controladas con TypeORM.

Pruebas unitarias básicas con Jest.

El proyecto está containerizado usando Docker y listo para desarrollo y pruebas.

🛠 Tecnologías

NestJS (TypeScript)

PostgreSQL

TypeORM

Docker & Docker Compose

Swagger

Jest (Pruebas unitarias)

class-validator & class-transformer (Validación de DTOs)

⚙️ Configuración del entorno

Variables de entorno necesarias:

DB_HOST=postgres_db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=backend
PORT=3000


Puedes crear un archivo .env en la raíz del proyecto con estas variables.

🚀 Levantar el proyecto

Levanta los contenedores Docker:

docker-compose up -d --build


Verifica que los contenedores estén corriendo:

docker ps

💾 Migraciones
Generar una nueva migration
docker exec -it nest_app npm run migration:generate

Ejecutar migrations pendientes
docker exec -it nest_app npm run migration:run

Revertir la última migration
docker exec -it nest_app npm run migration:revert


Nota: Las migrations se encuentran en src/migrations.

🧪 Pruebas unitarias

Ejecutar todas las pruebas:

docker exec -it nest_app npm test


Ejecutar pruebas en modo observación:

docker exec -it nest_app npm run test:watch

📄 Endpoints

La API expone los siguientes endpoints:

Propietarios (Owners)
Método	Ruta	Descripción
POST	/owners	Crear un nuevo propietario
GET	/owners	Listar todos los propietarios
GET	/owners/:id	Obtener propietario por ID
DELETE	/owners/:id	Eliminar propietario
Vehículos (Vehicles)
Método	Ruta	Descripción
POST	/vehicles	Crear un vehículo vinculado a un propietario
GET	/vehicles	Listar todos los vehículos (con propietario)
GET	/vehicles/:id	Obtener vehículo por ID
GET	/vehicles/search/:plate	Buscar vehículos por placa parcial
DELETE	/vehicles/:id	Eliminar un vehículo
📌 Swagger

La documentación de Swagger está disponible en:

http://localhost:3000/api


Permite probar todos los endpoints directamente desde el navegador.

🔧 Ejemplos de requests (JSON)
Crear un propietario
POST /owners
{
  "name": "Juan",
  "email": "juan@mail.com",
  "phone": "555-1234"
}

Crear un vehículo
POST /vehicles
{
  "plate": "ABC123",
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2020,
  "ownerId": "uuid-del-propietario"
}