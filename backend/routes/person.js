const express = require('express');
const router = express.Router();

const dao = require('../dao/person');

router.get('/isUsernameExist/:username', (req, res, next) => {
    dao.isUsernameExist(req, res, next);
});

router.post('/register', (req, res, next) => {
    dao.register(req, res, next);
});

router.post('/login', (req, res, next) => {
    dao.login(req, res, next);
});

router.post('/updateInfo', (req, res, next) => {
    dao.updateInfo(req, res, next);
});

router.post('/updatePassword', (req, res, next) => {
    dao.updatePassword(req, res, next);
});

router.get('/getByUsername/:username', (req, res, next) => {
    dao.getByUsername(req, res, next);
});

router.get('/getById/:id', (req, res, next) => {
    dao.getById(req, res, next);
});

module.exports = router;
