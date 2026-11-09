import { Router } from "express";
import { createUser, deleteUser, getUsers, getUser, updateUser } from "../controllers/users.controllers.js";
import { authMiddleware } from "../middlewares/authenticate.middleware.js";
import { authorizationMiddleware } from '../middlewares/authorization.middleware.js';


// Crea una instancia de las rutas de Express
const router = Router();    

// Define las rutas para los usuarios
router.post( '/', authMiddleware, authorizationMiddleware(['ADMIN']), createUser );         // 1. Registro Privado (Role: Administrador), va a poder asignar el rol

// Ruta GET con soporte para paginación y filtro de estado mediante Query Strings
// Ejemplos de consumo:
//   - GET /api/users                              (Por defecto: page=1, limit=10, status=true)
//   - GET /api/users?status=true                  (Solo usuarios activos)
//   - GET /api/users?status=false                 (Solo usuarios inactivos)
//   - GET /api/users?status=all                   (Todos los usuarios sin distingo de estado)
//   - GET /api/users?page=2&limit=5&status=all    (Paginado combinado con filtro de estado)
router.get( '/', authMiddleware, authorizationMiddleware(['ADMIN']), getUsers );

router.delete( '/:id', authMiddleware, authorizationMiddleware(['ADMIN']), deleteUser );
router.patch( '/:id', authMiddleware, authorizationMiddleware(['ADMIN']), updateUser );
router.get( '/:id', authMiddleware, authorizationMiddleware(['ADMIN']), getUser );


// Exportar las rutas definidas en este archivo
export default router;