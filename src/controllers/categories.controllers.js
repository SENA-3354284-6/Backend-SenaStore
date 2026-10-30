import { dbCreateCategory, dbDeleteCategory, dbGetCategories, dbGetCategory, dbUpdateCategory } from "../services/categories.services.js";

const createCategory = async ( req, res ) => {
    try {
        // Extrae el ID del usuario encontrado por el Middleware de Autenticacion
        const { _id } = req.userFound;

        // Extrae los datos del cuerpo de la peticion
        const inputData = req.body;
        inputData.createdBy = _id;    // <--- Agrega el ID del usuario que registra la categoria 
    
        // Usar el servicio para registrar
        const data = await dbCreateCategory( inputData );
    
        res.status(201).json({ msg: 'Registra categoria', data: data });
    }
    catch (error) {
        console.error(error);

        // Personaliza los mensajes de error definidos en el Modelo
        if( error.name == 'ValidationError' ) {
            const errors = {};

            // Iterar los errores para extraer el nombre de la propiedad y el error especifico
            for( const field in error.errors ) {
                errors[field] = error.errors[field].message;
            }

            return res.status(400).json({ errors });   // Retorna un error especifico de campo
        }

        // Verificar si el error es por duplicidad de categoria
        if( error.code == 11000 ) {
            // console.log( '> 1 >>>>>>', error.keyValue );      // { name: 'Salud' }
            // console.log( '> 2 >>>>>>', Object.keys( error.keyValue ) )
            // console.log( '> 3 >>>>>>', Object.keys( error.keyValue )[0] );
            const field = Object.keys(error.keyValue)[0];

            // Mensaje de error que se envia al cliente
            return res.status(400).json({
                msg: `Error por duplicidad en el campo '${field}'`,
                [field]: `El campo '${ field }' con el valor '${ error.keyValue[ field ]}'  , ya se encuentra registrado`
            });
        }

        res.status(500).json({ msg: 'No se pudo registrar la categoria' });
    }

}

const getCategories = async ( req, res ) => {
    try {
        const data = await dbGetCategories();
    
        res.json({
            msg: 'Lista de Categorias',
            data: data
        });
    } 
    catch (error) {
        console.error( error );

        res.status(500).json({
            msg: 'No ha podido obtener las categorias activas'
        });
    }

}

const deleteCategory = async ( req, res ) => {
    try {
        const id = req.params.id;
    
        const data = await dbDeleteCategory(id);
    
        res.json({
            msg: 'Elimina una categoria',
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
            msg: 'No se ha podido eliminar la categoria'
        })
    }

}

const updateCategory = async ( req, res ) => {
    try {
        const id = req.params.id;
        const inputData = req.body;
    
        const data = await dbUpdateCategory( id, inputData );   // <--- Suceptible de generar una Exception
    
        res.status(200).json({
            msg: 'Categoria Actualizada',
            data: data
        });
    }
    catch( error ){
        console.error( error );

        // Verificar si el error es por duplicidad de categoria
        if( error.code == 11000 ) {
            // console.log( '> 1 >>>>>>', error.keyValue );      // { name: 'Salud' }
            // console.log( '> 2 >>>>>>', Object.keys( error.keyValue ) )
            // console.log( '> 3 >>>>>>', Object.keys( error.keyValue )[0] );
            const field = Object.keys(error.keyValue)[0];

            // Mensaje de error que se envia al cliente
            return res.status(400).json({
                msg: `Error por duplicidad en el campo '${field}'`,
                [field]: `El campo '${ field }' con el valor '${ error.keyValue[ field ]}'  , ya se encuentra registrado`
            });
        }

        // Verificar formato del ID (ObjectId) en caso de que se envie un ID en el body
        if( error.name === 'CastError' ) {
            return res.status(400).json({
                msg: 'Error en el formato del ID',
                [error.path]: `El identificador ${ error.value } no tiene el formato valido que requiere MongoDB`
            });
        }

        // Personaliza los mensajes de error definidos en el Modelo
        if( error.name == 'ValidationError' ) {
            const errors = {};

            // Iterar los errores para extraer el nombre de la propiedad y el error especifico
            for( const field in error.errors ) {
                errors[field] = error.errors[field].message;
            }

            return res.status(400).json({ errors });   // Retorna un error especifico de campo
        }

        res.status(500).json({
            msg: 'No se ha podido actualizar la categoria'
        });
    }

}

const getCategory = async ( req, res ) => {
    try {
        const id = req.params.id;

        const data = await dbGetCategory( id );

        res.json({
            msg: 'Obtiene una categoria',
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
            msg: 'No se pudo obtener categoria por ID'
        });
    }
}


export {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory,
    getCategory
}