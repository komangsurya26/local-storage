require('dotenv').config()

const config = {
    development: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: 'postgres'
    },
    test: {
        username: '',
        password: null,
        database: '',
        host: '',
        dialect: ''
    },
    production: {
        username: '',
        password: null,
        database: '',
        host: '',
        dialect: ''
    }
};
module.exports = config
