import { Router } from "express";

import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categories.controllers.js";
import { authMiddleware } from "../middlewares/authenticate.middleware.js";
import { authorizationMiddleware } from '../middlewares/authorization.middleware.js';


// Crea una instancia de las rutas de Express
const router = Router();    

// Define las rutas para las categorias
router.post( 
    '/',                                                                // Ruta
    [ authMiddleware, authorizationMiddleware(['ADMIN','SELLER']) ],    // Lista de Middlewares next()
    createCategory                                                      // Controlador
);
router.get( '/', getCategories );
router.delete( '/:id', authMiddleware, deleteCategory );
router.patch( '/:id', authMiddleware, updateCategory );
router.get( '/:id', authMiddleware, getCategory );


// Exportar las rutas definidas en este archivo
export default router;