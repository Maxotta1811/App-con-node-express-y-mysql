const jwt = require('jsonwebtoken');

module.exports = function (app, dbService){

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


    app.get('/clientes', verificarToken, (request,response) => {
        dbService
        .verclientes()
        .then((clientes) => {
            response.json(clientes);
        })
        .catch((err) => {
            response.status(500).json(err);
        }); 

    });

    app.post('/clientes', verificarToken, (request,response) => {
        const nuevocliente = request.body;
        console.log(nuevocliente);

        dbService
        .agregarcliente(nuevocliente)
        .then(() => {
            response.json({"Mensaje":"Cliente Agregado!"});
        })
        .catch((err) => {
            response.status(500).json(err);
        });
    });

    app.put('/clientes/:idcliente', verificarToken, (request,response) => {
        const idcliente = request.params.idcliente;
        const clienteActualizado = request.body;

        dbService
        .modificarcliente(idcliente, clienteActualizado)
        .then( () => {
            response.json({"mensaje": "cliente actualizado!"});
        })
        .catch((err) => {
            response.status(500).json(err);
        });
    });

    app.delete('/clientes/:idcliente', verificarToken, (request,response) => {
        const idcliente = request.params.idcliente;

        dbService
        .borrarcliente(idcliente)
        .then( () => {
            response.json({"mensaje": "cliente borrado!"});
        })
        .catch((err) => {
            response.status(500).json(err);
        });
    });
};