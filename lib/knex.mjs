import _knex from 'knex'
let knex = null;

export default function(...args) {
  if (knex == null) {
    console.log(process.env)
    let db_host = process.env.DB_HOST ?? "172.17.0.1";
    let db_port = process.env.DB_PORT ?? "1433";
    let db_user = process.env.DB_USER ?? "sa";
    let db_password = process.env.DB_PASSWORD ?? "Bender28!";
    let db_database = process.env.DB_DATABASE ?? "AlamedaTideMark";
    knex = _knex({ 
      client: 'mssql',
      connection: {
        host : db_host,
        port : +db_port,
        user : db_user,
        password : db_password,
        database : db_database
      }
    });
  }
  return knex(...args);
}