const dev = {
    username: "root",
    password: "root",
    database: "sacred-dev",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: (_) => {},
};

module.exports = {
    development: dev,
    test: null,
    production: null
};