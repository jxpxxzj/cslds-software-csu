const $sql = {
    add: 'insert into course (course,time,place) values (?,?,?)',
    update: 'update course set course=?,time=?,place=? where id=?',
    getByTime: 'select * from course where time=?',
    list: 'select * from course order by id desc'
};
const mysql = require('mysql');
const $conf = require('../conf/config');
const $util = require('../util');

const pool = mysql.createPool($conf.mysql);

module.exports = {
    add(req, res) {
        if (!req.session.admin) {
            $util.jsonWrite(res, $util.unauthorized);
            return;
        }
        pool.getConnection((err, connection) => {
            const body = req.body;
            connection.query($sql.add, [body.course, body.time, body.place], (err, result) => {
                if (result) {
                    result = $util.success;
                }
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    update(req, res) {
        if (!req.session.admin) {
            $util.jsonWrite(res, $util.unauthorized);
            return;
        }
        pool.getConnection((err, connection) => {
            const body = req.body;
            connection.query($sql.update, [body.course, body.time, body.place, body.id], (err, result) => {
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
    list(req, res) {
        pool.getConnection((err, connection) => {
            connection.query($sql.list, (err, result) => {
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    }
};
