const express = require('express');
const router = express.Router();

const dao = require('../dao/person');

router.get('/isUsernameExist/:username', (req, res) => {
    dao.isUsernameExist(req, res);
});

router.post('/register', (req, res) => {
    dao.register(req, res);
});

router.post('/login', (req, res) => {
    dao.login(req, res);
});

router.post('/updateInfo', (req, res) => {
    dao.updateInfo(req, res);
});

router.post('/updatePassword', (req, res) => {
    dao.updatePassword(req, res);
});

router.get('/getByUsername/:username', (req, res) => {
    dao.getByUsername(req, res);
});

router.get('/getById/:id', (req, res) => {
    dao.getById(req, res);
});

module.exports = router;
