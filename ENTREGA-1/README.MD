# 🚀 ENTREGA-1

**Entrega 1 – Lógica de datos (API con FileSystem)**  
Proyecto desarrollado en **Node.js** y **Express** para gestionar productos y carritos utilizando archivos locales como persistencia.

---

## 🚀 Objetivo

Desarrollar una API que permita:

- Crear, listar, actualizar y eliminar productos.
- Crear carritos y agregar productos a ellos.
- Mantener los datos en archivos JSON (`products.json` y `carts.json`).

---

## ⚙️ Tecnologías

- **Node.js**
- **Express**
- **FileSystem (fs)**
- **UUID**

---

## 📁 Estructura del Proyecto

```
ENTREGA-1/
│
├── package.json
├── package-lock.json
├── index.js                   # Punto de entrada principal
│
├── src/
│   ├── app.js                 # Servidor principal y rutas de la API
│   │
│   └── data/
│       ├── ProductManager.js  # Lógica de gestión de productos
│       ├── CartManager.js     # Lógica de gestión de carritos
│       ├── products.json      # Datos persistentes de productos
│       └── carts.json         # Datos persistentes de carritos
│
└── node_modules/
```

---

## 🧱 Endpoints

### Productos (`/api/products`)

| Método | Ruta    | Descripción                      |
| ------ | ------- | -------------------------------- |
| GET    | `/`     | Obtener todos los productos      |
| GET    | `/:pid` | Obtener un producto por ID       |
| POST   | `/`     | Crear un nuevo producto          |
| PUT    | `/:pid` | Actualizar un producto existente |
| DELETE | `/:pid` | Eliminar un producto por ID      |

### Carritos (`/api/carts`)

| Método | Ruta                 | Descripción                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/`                  | Crear un nuevo carrito         |
| GET    | `/:cid`              | Obtener un carrito por ID      |
| POST   | `/:cid/product/:pid` | Agregar un producto al carrito |

---

## 💾 Persistencia de Datos

Los datos se guardan en archivos JSON mediante el módulo `fs`:
- `src/data/products.json`
- `src/data/carts.json`

Cada archivo se actualiza automáticamente cuando se agregan, editan o eliminan elementos.

---

## ▶️ Ejecución

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar el servidor:
   ```bash
   node src/app.js
   ```

3. El servidor se ejecuta en:
   ```
   http://localhost:3000
   ```

