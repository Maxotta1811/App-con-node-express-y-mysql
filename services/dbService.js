const dbService = () => {
    const knex = require("knex") ({
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB,
        },
    });

    const table = "clientes";

    const verclientes = () => {
        return knex(table).select();
    }

    const agregarcliente = ({nomclient, dirclient, telclient}) => {
        return knex(table).insert({
            nomclient: nomclient,
            dirclient: dirclient,
            telclient: telclient,
        });
    };

    const modificarcliente = (idcliente, {nomclient, dirclient, telclient}) => {
        return knex(table).where("idcliente", idcliente).update({
            nomclient: nomclient,
            dirclient: dirclient,
            telclient: telclient,
        });
    };
    
    const borrarcliente = (idcliente) => {
        return knex(table).where("idcliente", idcliente).del();
    };

    return {
        verclientes,
        agregarcliente,
        modificarcliente,
        borrarcliente,
    };

};

    module.exports = {
        dbService
    }