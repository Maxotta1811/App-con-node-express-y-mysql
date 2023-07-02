const jwt = require('jsonwebtoken');
const { dbService } = require('./services/dbservice');
const clientesService = dbService('clientes');
const proveedoresService = dbService('proveedor');
const empleadosService = dbService('empleados');
const productosService = dbService('productos');

module.exports = function (app){

      // Middleware para verificar el token
      function verificarToken(req, res, next) {
        const token = req.headers['authorization'];
        console.log('Token:', token);

        if (!token) {
            return res.status(401).json({ mensaje: 'Token no proporcionado' });
        }
        
        const tokenSinPrefijo = token.replace('Bearer ', '');
        jwt.verify(tokenSinPrefijo, app.get('key'), (err, decoded) => {
            if (err) {
                return res.status(403).json({ mensaje: 'Token inválido' });
            }
            
            req.decoded = decoded;
            next();
        });
    }
 
    app.get('/', (request,response) => {
            response.json({"Mensaje": "Correcto"
        });
     
    });

//Token
    app.post('/login', (request,response) => {
        if(request.body.usuario == 'admin'&& request.body.pass == '123456'){
            const payload ={
                check:true
            };
            const token = jwt.sign(payload,app.get('key'), {
                expiresIn:'5m'
            });
            response.json({
                Mensaje: "Autenticación exitosa!",
                token: token
            });
        }else{
            response.json({
                Mensaje: "Usuario y/o Contraseña incorrectos"
            });
        };

    });

    // Rutas Para Clientes

    app.get('/clientes', verificarToken, (request, response) => {
        clientesService 
        .verRegistros()
        .then((clientes) => {
            response.json(clientes);
        })
        .catch((err) => {
            response.status(500).json(err);
        });
    });
    
    app.post('/clientes', verificarToken, (request, response) => {
        const nuevocliente = request.body;
        console.log(nuevocliente);
    
        clientesService 
        .agregarRegistro(nuevocliente)
        .then(() => {
            response.json({"Mensaje": "Cliente Agregado!"});
        })
        .catch((err) => {
            response.status(500).json(err);
        });
    });
    
    app.put('/clientes/:idcliente', verificarToken, (request, response) => {
        const idcliente = request.params.idcliente;
        const clienteActualizado = request.body;

        clientesService.modificarRegistro('idcliente', idcliente, clienteActualizado)
            .then(() => {
                response.json({ "mensaje": "Cliente actualizado!" });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
    
    app.delete('/clientes/:idcliente', verificarToken, (request, response) => {
        const idcliente = request.params.idcliente;
    
        clientesService.borrarRegistro('idcliente', idcliente)
            .then(() => {
                response.json({ "mensaje": "Cliente borrado!" });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });

    // Rutas para proveedores
    app.get('/proveedor', verificarToken, (request, response) => {
        proveedoresService 
            .verRegistros()
            .then((proveedor) => {
                response.json(proveedor);
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
    
    app.post('/proveedor', verificarToken, (request, response) => {
        const nuevoproveedor = request.body;
        console.log(nuevoproveedor);
    
        proveedoresService 
            .agregarRegistro(nuevoproveedor)
            .then(() => {
                response.json({ "Mensaje": "Proveedor Agregado!" });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
    
    app.put('/proveedor/:idproveedor', verificarToken, (request, response) => {
        const idproveedor = request.params.idproveedor;
        const proveedorActualizado = request.body;
    
        proveedoresService.modificarRegistro('idprov',idproveedor, proveedorActualizado)
            .then(() => {
                response.json({ "mensaje": "Proveedor actualizado!" });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
    
    app.delete('/proveedor/:idproveedor', verificarToken, (request, response) => {
        const idproveedor = request.params.idproveedor;

        proveedoresService.borrarRegistro('idprov', idproveedor)
            .then(() => {
                response.json({ "mensaje": "Proveedor borrado!" });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
    
    // Rutas para empleados
    app.get('/empleados', verificarToken, (request, response) => {
        empleadosService 
            .verRegistros()
            .then((empleados) => {
                response.json(empleados);
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
    
    app.post('/empleados', verificarToken, (request, response) => {
        const nuevoempleado = request.body;
        console.log(nuevoempleado);
    
        empleadosService 
            .agregarRegistro(nuevoempleado)
            .then(() => {
                response.json({ "Mensaje": "Empleado Agregado!" });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
    
    app.put('/empleados/:idempleado', verificarToken, (request, response) => {
        const idempleado = request.params.idempleado;
        const empleadoActualizado = request.body;
    
        empleadosService.modificarRegistro('idempleado',idempleado, empleadoActualizado)
            .then(() => {
                response.json({ "mensaje": "Empleado actualizado!" });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
    
    app.delete('/empleados/:idempleado', verificarToken, (request, response) => {
        const idempleado = request.params.idempleado;

        empleadosService.borrarRegistro('idempleado', idempleado)
            .then(() => {
                response.json({ "mensaje": "Empleado borrado!" });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
    
    // Rutas para productos
    app.get('/productos', verificarToken, (request, response) => {
        productosService 
            .verRegistros()
            .then((productos) => {
                response.json(productos);
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
    
    app.post('/productos', verificarToken, (request, response) => {
        const nuevoproducto = request.body;
        console.log(nuevoproducto);
    
        productosService 
            .agregarRegistro(nuevoproducto)
            .then(() => {
                response.json({ "Mensaje": "Producto Agregado!" });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
    
    app.put('/productos/:idproducto', verificarToken, (request, response) => {
        const idproducto = request.params.idproducto;
        const productoActualizado = request.body;
    
        productosService.modificarRegistro('idprod',idproducto, productoActualizado)
            .then(() => {
                response.json({ "mensaje": "Producto actualizado!" });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
    
    app.delete('/productos/:idproducto', verificarToken, (request, response) => {
        const idproducto = request.params.idproducto;

        productosService.borrarRegistro('idprod', idproducto)
            .then(() => {
                response.json({ "mensaje": "Producto borrado!" });
            })
            .catch((err) => {
                response.status(500).json(err);
            });
    });
};    