import { Router } from "express";
import { createProduct, deleteProduct, getProducts, getProduct, updateProduct } from "../controllers/products.controllers.js";
import { authMiddleware } from "../middlewares/authenticate.middleware.js";
import { authorizationMiddleware } from '../middlewares/authorization.middleware.js';


// Crea una instancia de las rutas de Express
const router = Router();    

// Define las rutas para los productos
router.post( '/', authMiddleware, authorizationMiddleware(['ADMIN']), createProduct );
router.get( '/', getProducts );
router.delete( '/:id', authMiddleware, authorizationMiddleware(['ADMIN']), deleteProduct );
router.patch( '/:id', authMiddleware, authorizationMiddleware(['ADMIN','SELLER']), updateProduct );
router.get( '/:id', authMiddleware, getProduct );


// Exportar las rutas definidas en este archivo
export default router;