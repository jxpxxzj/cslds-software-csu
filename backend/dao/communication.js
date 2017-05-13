const $sql = {
    add: 'insert into communication (person,time,message) values (?,?,?)',
    update: 'update communication set message=? where id=?',
    delete: 'delete from communication where id=?',
    getByTime: 'select * from communication where time=?',
    getByPerson: 'select * from communication where person=?',
    list: 'select * from communication'
};

const mysql = require('mysql');
const $conf = require('../conf/config');
const $util = require('../util');

const pool = mysql.createPool($conf.mysql);

module.exports = {
    add(req, res) {
        pool.getConnection((err, connection) => {
            const body = req.body;
            connection.query($sql.add, [body.person, body.time, body.message], (err, result) => {
                if (result) {
                    result = $util.success;
                }
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    update(req, res) {
        pool.getConnection((err, connection) => {
            const body = req.body;
            connection.query($sql.update, [body.message, body.id], (err, result) => {
                if (result) {
                    result = $util.success;
                }
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    delete(req, res) {
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
    },
    getByTime(req, res) {
        pool.getConnection((err, connection) => {
            const time = req.params.time;
            connection.query($sql.getByTime, [time], (err, result) => {
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    getByPerson(req, res) {
        pool.getConnection((err, connection) => {
            const person = req.params.person;
            connection.query($sql.getByPerson, [person], (err, result) => {
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    list(req, res) {
        pool.getConnection((err, connection) => {
            connection.query($sql.list, (err, result) => {
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    }
};
