const mysql = require('mysql')

const PoolConnection = () => mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT_POOL,
  port: process.env.MYSQL_PORT
})

const query = (dbConnection, sql) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(sql, (err, results, fields) => {
      if (err) {
        reject(err)
      }
      resolve([results, fields])
    })
  })
}
module.exports = {
  query,
  PoolConnection
}
