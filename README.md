#  API de Usuarios con Express y MongoDB

Una API RESTful moderna para gestión de usuarios, construida con Express.js y MongoDB

##  Características

-  CRUD completo de usuarios
-  Búsqueda por ciudad
-  Paginación de resultados
-  Validación de datos
-  API RESTful moderna

##  Tecnologías

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

##  Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/loaiza000/pruebaTecnica-Conteo.git
cd pruebaTecnica-Conteo
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/prueba_backend
```

### 4️ Iniciar el servidor

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000` 

### ENDPOINTS DE USUARIOS 

####  Crear Usuario
- **Método:** `POST`
- **URL:** `http://localhost:3000/usuarios`
- **Body:**
```json
{
  "nombre": "Carlos Rodríguez",
  "email": "carlos@example.com",
  "edad": 32,
  "direcciones": [
    {
      "calle": "Calle 45",
      "ciudad": "Medellín",
      "pais": "Colombia",
      "codigo_postal": "050005"
    }
  ]
}
```

####  Listar Usuarios (con paginación)
- **Método:** `GET`
- **URL:** `http://localhost:3000/usuarios?page=1&limit=5`

####  Obtener Usuario por ID
- **Método:** `GET`
- **URL:** `http://localhost:3000/usuarios/67d8a2232e9c14cc448cd341`

####  Actualizar Usuario
- **Método:** `PUT`
- **URL:** `http://localhost:3000/usuarios/67d8a2232e9c14cc448cd341`
- **Body:**
```json
{
  "nombre": "Carlos Rodríguez",
  "email": "carlos.new@example.com",
  "edad": 33,
  "direcciones": [
    {
      "calle": "Avenida Principal",
      "ciudad": "Bogotá",
      "pais": "Colombia",
      "codigo_postal": "110111"
    }
  ]
}
```

####  Eliminar Usuario
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/usuarios/67d8a2232e9c14cc448cd341`

####  Buscar Usuarios por Ciudad
- **Método:** `GET`
- **URL:** `http://localhost:3000/usuarios/buscar?ciudad=Medellín`


