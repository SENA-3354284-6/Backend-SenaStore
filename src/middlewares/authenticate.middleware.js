import { generateToken, validateToken } from "../helpers/jwt.helpers.js";
import { dbGetUserByEmail } from "../services/users.services.js";

const authMiddleware = async ( req, res, next ) => {
    // Paso 1: Obtener el Token de la cabecera
    const token = req.header( 'X-Token' );

    const msg = 'Hola soy el Middleware de Autenticacion';
    console.log( 'token: ', token );

    // (2.1) Verifica que haya recibido una cadena 
    if( ! token ) {
        res.status( 401 ).json({
            msg: 'Cadena de token vacia'
        });
    }

    // (2.2) Divide la cadena en partes usando el (.) punto como referencia
    const tokenParts = token.split( '.' );
    // console.log( 'Token Parts: ', tokenParts );
    
    // (2.3) Verificar que la cadena tenga 3 partes separadas por puntos (Forma base de un Token)
    if( tokenParts.length !== 3 ) {
        res.json({
            msg: 'Formato del token no es valido'
        });
    }

    // (2.4) Verificar la autenticidad del token (si fue generado por jwt de esta aplicacion)
    const payload = validateToken(token);

    if( ! payload ) {
        res.json({
            msg: 'Token invalido o inactivo'
        });
    }

    console.log( 'payload (middleware): ', payload );

    // Paso 3: Verificar que el usuario exista en la base de datos (si el usuario fue eliminado o su estado es false es decir esa inactivo, el token ya no es valido)
    const userFound = await dbGetUserByEmail( payload.email );

    if( ! userFound ) {
        res.json({
            msg: 'El usuario deshabilitado o no registrado. No es posible generar token'
        });
    }

    req.userFound = userFound;   // Guardar el usuario encontrado en la request para que pueda ser usado en los controladores

    console.log( 'userFound', userFound );

    next();
}

export {
    authMiddleware
}