const $sql = {
    add: 'insert into application (person,type,detail,state,time) values (?,?,?,?,?)',
    update: 'update application set detail=?, state=? where id=?',
    getByPerson: 'select * from application where person =?',
    getByState: 'select * from application where state=?'
};
const mysql = require('mysql');
const $conf = require('../conf/config');
const $util = require('../util');

const pool = mysql.createPool($conf.mysql);

module.exports = {
    add(req, res, next) {
        if (req.session.user) {
            pool.getConnection((err, connection) => {
                const body = req.body;
                const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
                const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().replace('T', ' ').substring(0, 19);
                connection.query($sql.add, [req.session.user.username, body.type, body.detail, '申请中', localISOTime], (err, result) => {
                    if (result) {
                        result = $util.success;
                    }
                    $util.jsonWrite(res, result);
                });
                connection.release();
            });
        } else {
            $util.jsonWrite(res, $util.unauthorized);
        }
    },
    update(req, res, next) {
        if (!req.session.admin) {
            $util.jsonWrite(res, $util.unauthorized);
            return;
        }
        pool.getConnection((err, connection) => {
            const body = req.body;
            connection.query($sql.update, [body.detail, '已阅', body.id], (err, result) => {
                if (result) {
                    result = $util.success;
                }
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    getByPerson(req, res, next) {
        pool.getConnection((err, connection) => {
            const person = req.params.person;
            connection.query($sql.getByPerson, [person], (err, result) => {
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    getByState(req, res, next) {
        if (!req.session.admin) {
            $util.jsonWrite(res, $util.unauthorized);
            return;
        }
        pool.getConnection((err, connection) => {
            const state = req.params.state;
            connection.query($sql.getByState, [state], (err, result) => {
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    }
};
