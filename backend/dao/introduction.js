const $sql = {
    add: 'insert into introduction (introduction, constitution, rule) values (?,?,?)',
    update: 'update introduction set introduction=?, constitution=?, rule=?',
    get: 'select * from introduction limit 1'
};

const mysql = require('mysql');
const $conf = require('../conf/config');
const $util = require('../util');

const pool = mysql.createPool($conf.mysql);

module.exports = {
    add(req, res) {
        pool.getConnection((err, connection) => {
            const body = req.body;
            connection.query($sql.add, [body.introduction, body.constitution, body.rule], (err, result) => {
                if (result) {
                    result = $util.success;
                }
                $util.jsonWrite(res, result);
                connection.release();
            });
        });
    },
    get(req, res) {
        pool.getConnection((err, connection) => {
            connection.query($sql.get, (err, result) => {
                $util.jsonWrite(res, result[0]);
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
            connection.query($sql.update, [body.introduction, body.constitution, body.rule], (err, result) => {
                if (result) {
                    result = $util.success;
                    $util.jsonWrite(res, result);
                }

                connection.release();
            });
        });
    }
};
