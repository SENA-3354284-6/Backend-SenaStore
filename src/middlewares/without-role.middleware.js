const withoutRoleMiddleware = (req, res, next) => {
    // Paso 1: Obtiene los datos de la peticion
    const inputData = req.body;

    // Paso 2: Elimina el rol para que se registre el rol por defecto
    delete inputData.role;      // Eliminando la propiedad role

    // Paso 3: El Middleware lanza el control de la aplicacion a la siguiente funcion
    next();
}


export default withoutRoleMiddleware;