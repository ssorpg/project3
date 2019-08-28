require('dotenv').config();

module.exports = {
    'development': {
        'username': process.env.MYSQL_USER,
        'password': process.env.MYSQL_PASS,
        'database': 'tpn',
        'host': '127.0.0.1',
        'port': 3306,
        'dialect': 'mysql'
    },
    'test': {
        'username': 'root',
        'password': null,
        'database': 'database_test',
        'host': '127.0.0.1',
        'port': 3306,
        'dialect': 'mysql'
    },
    'production': {
        'username': process.env.MYSQL_USER,
        'password': process.env.MYSQL_PASS,
        'database': process.env.DATABASE,
        'host': process.env.HOST,
        'port': 3306,
        'dialect': 'mysql'
    }
};