const express = require('express');
const router = express.Router();

const dao = require('../dao/counselingRoom');

router.post('/add', (req, res) => {
    dao.add(req, res);
});

router.post('/update', (req, res) => {
    dao.update(req, res);
});

router.get('/getByTime/:time', (req, res) => {
    dao.getByTime(req, res);
});

router.get('/getByPlace/:place', (req, res) => {
    dao.getByPlace(req, res);
});

router.get('/list', (req, res) => {
    dao.list(req, res);
});

module.exports = router;
