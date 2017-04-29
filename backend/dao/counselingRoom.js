const $sql = {
    add: 'insert into counselingroom (time,place) values (?,?)',
    update: 'update counselingroom set time=?, place=? where id=?',
    getByTime: 'select * from counselingroom where time=?',
    getByPlace: 'select * from counselingroom where place=?',
    list: 'select * from counselingroom'
};
const mysql = require('mysql');
const $conf = require('../conf/config');
const $util = require('../util');

const pool = mysql.createPool($conf.mysql);

module.exports = {
    add(req, res, next) {
        if (!req.session.admin) {
            $util.jsonWrite(res, $util.unauthorized);
            return;
        }
        pool.getConnection((err, connection) => {
            const body = req.body;
            connection.query($sql.add, [body.time, body.place], (err, result) => {
                if (result) {
                    result = $util.success;
                }
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    update(req, res, next) {
        if (!req.session.admin) {
            $util.jsonWrite(res, $util.unauthorized);
            return;
        }
        pool.getConnection((err, connection) => {
            const body = req.body;
            connection.query($sql.update, [body.time, body.place, body.id], (err, result) => {
                if (result) {
                    result = $util.success;
                }
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    getByTime(req, res, next) {
        pool.getConnection((err, connection) => {
            const time = req.params.time;
            connection.query($sql.getByTime, [time], (err, result) => {
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    getByPlace(req, res, next) {
        pool.getConnection((err, connection) => {
            const place = req.params.place;
            connection.query($sql.getByPlace, [place], (err, result) => {
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    list(req, res, next) {
        pool.getConnection((err, connection) => {
            connection.query($sql.list, (err, result) => {
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    }
};
