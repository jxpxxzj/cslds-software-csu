const $sql = {
    login: 'select * from admin where account=? and password=?'
};
const mysql = require('mysql');
const $conf = require('../conf/config');
const $util = require('../util');

const pool = mysql.createPool($conf.mysql);

module.exports = {
    login(req, res) {
        pool.getConnection((err, connection) => {
            const body = req.body;
            connection.query($sql.login, [body.account, body.password], (err, result) => {
                if (result.length !== 0) {
                    req.session.admin = result[0];
                    console.log(req.session);
                    result = $util.success;
                }
                $util.jsonWrite(res, result.length !== 0 ? result : $util.unauthorized);
            });
            connection.release();
        });
    }
};
