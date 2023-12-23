const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool({
  database: config.db.database,
  host: config.db.host,
  password: config.db.password,
  port: config.db.database_port,
  user: config.db.user,
});

module.exports = pool;
