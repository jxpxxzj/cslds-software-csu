const $sql = {
    add: 'insert into teacher (name,intro,image,type,class,phone,subject,achievement) values (?,?,?,?,?,?,?,?)',
    update: 'update teacher set `name`=?, intro=?, image=?,type=?,class=?,phone=?,subject=?,achievement=? where id=?',
    list: 'select * from teacher',
    delete: 'delete from teacher where id=?',
    getByType: 'select * from teacher where type=?'
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
            connection.query($sql.add, [body.name, body.intro, body.image, body.type, body.class, body.phone, body.subject, body.achievement], (err, result) => {
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
            connection.query($sql.update, [body.name, body.intro, body.image, body.type, body.class, body.phone, body.subject, body.achievement, body.id], (err, result) => {
                if (result) {
                    result = $util.success;
                }
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
    },
    delete(req, res) {
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
    },
    getByType(req, res) {
        pool.getConnection((err, connection) => {
            const type = req.params.type;
            connection.query($sql.getByType, [type], (err, result) => {
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    }
};
