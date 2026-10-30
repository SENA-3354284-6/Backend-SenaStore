// allowed roles: Roles permitidos ['ADMIN']

const authorizationMiddleware = ( allowedRoles ) => {

    return ( req, res, next ) => {
        // Paso 1: Extraer el rol del usuario del payload del token que valida el Middleware de Autenticacion
        const role = req.userFound.role;
    
        if ( ! role ) {
            return res.status(403).json({ msg: 'Error: El usuario autenticado no tiene rol definido' });
        }

        // Paso 2: Verificar si el rol del usuario se encuentra en lista de roles permitidos... para esta ruta
        if( ! allowedRoles.includes( role ) ) {
            return res.status(403).json({
                msg: `Error: el rol ${ role } no esta autorizado para realizar esta accion`
            });
        }
        
        console.log(`Usuario autorizado con rol ${role}`);

        next();
    }

}


export {
    authorizationMiddleware
}