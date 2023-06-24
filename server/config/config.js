require('dotenv').config({ path: `${__dirname}/../../.env` });

module.exports = {
 development: {
   username: process.env.DB_USERNAME || 'postgres',
   password: process.env.DB_PASSWORD || 'invoswift',
   database: process.env.DB_NAME || 'invoswift',
   host: process.env.DB_HOST || '127.0.0.1',
   port: process.env.DB_PORT || 5432,
   dialect: process.env.DIALECT || 'postgres',
 },
 test: {
   username: process.env.DB_USERNAME || 'invoswift',
   password: process.env.DB_PASSWORD || 'invoswift',
   database: process.env.DB_NAME || 'invoswift',
   host: process.env.DB_HOST || '127.0.0.1',
   port: 5432,
   dialect: process.env.DIALECT || 'postgres',
 },
 production: {
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   dialect: process.env.DIALECT,
 },
}; 