const express = require('express');
const router = express.Router();

const dao = require('../dao/teacher');

router.get('/list', (req, res, next) => {
    dao.list(req, res, next);
});

router.post('/add', (req, res, next) => {
    dao.add(req, res, next);
});

router.post('/update', (req, res, next) => {
    dao.update(req, res, next);
});

router.get('/delete/:id', (req, res, next) => {
    dao.delete(req, res, next);
});

router.get('/getByType/:type', (req, res, next) => {
    dao.getByType(req, res, next);
});

module.exports = router;
