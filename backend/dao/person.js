const $sql = {
    isUsernameExist: 'select count(*) from person where username=?',
    register: 'insert into person (username,password,class,number,phone,qq) values (?,?,?,?,?,?)',
    login: 'select * from person where username=? and password=?',
    updateInfo: 'update person set class=?, number=?, phone=?, qq=? where id=?',
    updatePassword: 'update person set password=? where id=? and password=?',
    getByUsername: 'select * from person where username=?',
    getById: 'select * from person where id=?'
};

const mysql = require('mysql');
const passwordHash = require('password-hash');
const $conf = require('../conf/config');
const $util = require('../util');

const pool = mysql.createPool($conf.mysql);

module.exports = {
    isUsernameExist(req, res, next) {
        pool.getConnection((err, connection) => {
            const username = req.params.username;
            connection.query($sql.isUsernameExist, [username], (err, result) => {
                $util.jsonWrite(res, {
                    isExist: result[0]['count(*)'].toString() !== '0'
                });
            });
            connection.release();
        });
    },
    register(req, res, next) {
        pool.getConnection((err, connection) => {
            const body = req.body;
            connection.query($sql.register, [body.username, passwordHash.generate(body.password), body.class, body.number, body.phone, body.qq], (err, result) => {
                if (result) {
                    result = $util.success;
                }
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    login(req, res, next) {
        pool.getConnection((err, connection) => {
            const body = req.body;
            connection.query($sql.getByUsername, [body.username], (err, result) => {
                if (result.length !== 0 && passwordHash.verify(body.password, result[0].password)) {
                    req.session.user = result[0];
                    console.log(result[0]);
                    result = {
                        loginState: 'success'
                    };
                } else {
                    result = {
                        loginState: 'fail'
                    };
                }
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    updateInfo(req, res, next) {
        if (req.session.user) {
            pool.getConnection((err, connection) => {
                const body = req.body;
                connection.query($sql.updateInfo, [body.class, body.number, body.phone, body.qq, req.session.user.id], (err, result) => {
                    if (result) {
                        result = $util.success;
                        req.session.user.classes = body.class;
                        req.session.user.number = body.number;
                        req.session.user.phone = body.phone;
                        req.session.user.qq = body.qq;
                    }
                    $util.jsonWrite(res, result);
                });
                connection.release();
            });
        } else {
            $util.jsonWrite(res, $util.unauthorized);
        }
    },
    updatePassword(req, res, next) {
        if (req.session.user) {
            pool.getConnection((err, connection) => {
                const body = req.body;
                connection.query($sql.updatePassword, [passwordHash.generate(body.password), req.session.user.id, passwordHash.generate(body.oldPassword)], (err, result) => {
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
    getByUsername(req, res, next) {
        pool.getConnection((err, connection) => {
            const username = req.params.username;
            connection.query($sql.getByUsername, [username], (err, result) => {
                $util.jsonWrite(res, result[0]);
            });
            connection.release();
        });
    },
    getById(req, res, next) {
        pool.getConnection((err, connection) => {
            const id = req.params.id;
            connection.query($sql.getById, [id], (err, result) => {
                $util.jsonWrite(res, result[0]);
            });
            connection.release();
        });
    }
};

