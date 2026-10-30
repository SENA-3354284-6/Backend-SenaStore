import { dbCreateProduct, dbDeleteProduct, dbGetProducts, dbGetProduct, dbUpdateProduct } from "../services/products.services.js";

const createProduct = async ( req, res ) => {
    try {
        // Extrae el ID del usuario (En 2 pasos)
        const userFound = req.userFound;   // <-- Extrae todos los datos del usuario que se encontraban en el payload del Token
        const id = userFound._id           // <-- Obtiene solo el _id del usuario encontrado

        // Extrae los datos del cuerpo de la peticion
        const inputData = req.body;
        inputData.createdBy = id;
    
        // Usar el servicio para registrar
        const data = await dbCreateProduct( inputData );
    
        res.json({ msg: 'Registra producto', data: data });
    }
    catch (error) {
        console.error(error);

        if( error.name == 'ValidationError' ) {
            const errors = {};

            // Iterar los errores para extraer el nombre de la propiedad y el error especifico
            for( const field in error.errors ) {
                errors[field] = error.errors[field].message;
            }

            res.json({ errors });   // Retorna un error especifico de campo
        }

        // Error Generico
        res.json({ msg: 'No se pudo registrar el producto' });

    }
}

const getProducts = async ( req, res ) => {
    try {
        const data = await dbGetProducts();
    
        res.json({
            msg: 'Lista de Productos',
            data: data
        });
    } 
    catch (error) {
        console.error( error );

        res.json({
            msg: 'No se ha podido obtener los productos'
        });
    }
}

const deleteProduct = async ( req, res ) => {
    try {
        const id = req.params.id;
    
        const data = await dbDeleteProduct(id);
    
        res.json({
            msg: 'Elimina un producto',
            data: data
        });
    } 
    catch (error) {
        console.error( error );
        
        res.json({
            msg: 'No se ha podido eliminar el producto'
        });
    }
}

const updateProduct = async ( req, res ) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
    
        const data = await dbUpdateProduct( id, inputData );   // <--- Suceptible de generar una Exception
    
        res.json({
            msg: 'Producto Actualizado',
            data: data
        });
    }
    catch( error ){
        console.error( error );

        res.json({
            msg: 'No se ha podido actualizar el producto'
        });
    }
}

const getProduct = async ( req, res ) => {
    const id = req.params.id;

    try {
        const data = await dbGetProduct( id );

        res.json({
            msg: 'Obtiene un producto',
            data: data
        });
    } 
    catch (error) {
        console.error( error );

        // Verificar formato del ID (ObjectId) en caso de que se envie un ID en el body
        if( error.name === 'CastError' ) {
            return res.status(400).json({
                msg: 'Error en el formato del ID',
                [error.path]: `El identificador ${ error.value } no tiene el formato valido que requiere MongoDB`
            });
        }

        res.status(500).json({
            msg: 'No se pudo obtener producto por ID'
        });
    }
}


export {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    getProduct
}