const $sql = {
    list: 'select * from activity order by id desc',
    get: 'select * from activity where id=?',
    add: 'insert into activity (title,date,address) values (?,?,?)',
    update: 'update activity set title=?,date=?,address=? where id=?',
    delete: 'delete from activity where id=?'
};

const mysql = require('mysql');
const $conf = require('../conf/config');
const $util = require('../util');

const pool = mysql.createPool($conf.mysql);

module.exports = {
    list(req, res, next) {
        pool.getConnection((err, connection) => {
            connection.query($sql.list, (err, result) => {
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    get(req, res, next) {
        pool.getConnection((err, connection) => {
            const id = req.params.id;
            connection.query($sql.get, [id], (err, result) => {
                $util.jsonWrite(res, result[0]);
            });
            connection.release();
        });
    },
    add(req, res, next) {
        if (!req.session.admin) {
            $util.jsonWrite(res, $util.unauthorized);
            return;
        }
        pool.getConnection((err, connection) => {
            const body = req.body;
            connection.query($sql.add, [body.title, body.date, body.address], (err, result) => {
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
            connection.query($sql.update, [body.title, body.date, body.address, body.id], (err, result) => {
                if (result) {
                    result = $util.success;
                }
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    delete(req, res, next) {
        if (!req.session.admin) {
            $util.jsonWrite(res, $util.unauthorized);
            return;
        }
        pool.getConnection((err, connection) => {
            const id = req.params.id;
            connection.query($sql.delete, [id], (err, result) => {
                if (result) {
                    result = $util.success;
                }
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    }
};
