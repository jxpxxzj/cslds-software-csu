const express = require('express');
const router = express.Router();

const dao = require('../dao/course');

router.get('/getByTime/:time', (req, res, next) => {
    dao.getByTime(req, res, next);
});

router.post('/add', (req, res, next) => {
    dao.add(req, res, next);
});

router.post('/update', (req, res, next) => {
    dao.update(req, res, next);
});

router.get('/list', (req, res, next) => {
    dao.list(req, res, next);
});

module.exports = router;
