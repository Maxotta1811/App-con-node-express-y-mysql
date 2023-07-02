const dbService = (table) => {
    const knex = require("knex")({
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB,
        },
    });

    const verRegistros = () => {
        return knex.queryBuilder().from(table).select();
    };

    const agregarRegistro = (data) => {
        return knex(table)
          .insert(data)
          .then(() => {
            return knex(table).where(data).select('*');
          })
          .then((result) => result[0]);
      };

      const modificarRegistro = (idColumn, id, data) => {
        if (!idColumn || !id || !data) {
          return Promise.reject(new Error('Parámetros incorrectos'));
        }
      
        return knex(table)
          .where(idColumn, id)
          .update(data)
          .then(() => {
            return knex(table).where(idColumn, id).select('*');
          })
          .then((result) => result[0]);
      };

      const borrarRegistro = (idColumn, id) => {
        return knex(table).where(idColumn, id).del();
    };

    return {
        verRegistros,
        agregarRegistro,
        modificarRegistro,
        borrarRegistro,
    };
};

module.exports = { dbService };