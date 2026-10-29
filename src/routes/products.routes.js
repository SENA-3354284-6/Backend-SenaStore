import { Router } from "express";
import { createProduct, deleteProduct, getProducts, getProduct, updateProduct } from "../controllers/products.controllers.js";
import { authMiddleware } from "../middlewares/authenticate.middleware.js";


// Crea una instancia de las rutas de Express
const router = Router();    

// Define las rutas para los productos
router.post( '/', authMiddleware, createProduct );
router.get( '/', getProducts );
router.delete( '/:id', authMiddleware, deleteProduct );
router.patch( '/:id', authMiddleware, updateProduct );
router.get( '/:id', authMiddleware, getProduct );


// Exportar las rutas definidas en este archivo
export default router;