const $sql = {
    add: 'insert into material (title,address) values (?,?)',
    delete: 'delete from material where id=?',
    list: 'select * from material',
    getById: 'select * from material where id=?'
};

const mysql = require('mysql');
const fs = require('fs');
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
            connection.query($sql.add, [body.title, body.address], (err, result) => {
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
    },
    list(req, res, next) {
        pool.getConnection((err, connection) => {
            connection.query($sql.list, (err, result) => {
                $util.jsonWrite(res, result);
            });
            connection.release();
        });
    },
    listFile(req, res, next) {
        if (!req.session.admin) {
            $util.jsonWrite(res, $util.unauthorized);
            return;
        }
        fs.readdir('./public/file', (err, files) => {
            $util.jsonWrite(res, files);
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
    },
    upload(req, res, next) {
        if (!req.session.admin) {
            $util.jsonWrite(res, $util.unauthorized);
            return;
        }
        const tmp_path = req.file.path;
        const randstr = Math.round(Math.random() * 10000).toString() + '_';
        const target_path = './public/file/' + randstr + req.file.originalname;
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            fs.unlink(tmp_path, function() {
                if (err) throw err;
                $util.jsonWrite(res, {
                    path: randstr + req.file.originalname,
                    size: req.file.size
                });
            });
        });
    },
    download(req, res, next) {
        const fileName = req.params.fileName;
        const filePath = './public/file/' + fileName;
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
            res.set({
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': 'attachment; filename=' + fileName,
                'Content-Length': stats.size
            });
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.end(404);
        }
    }
};
