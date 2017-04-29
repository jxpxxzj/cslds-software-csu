const express = require('express');
const router = express.Router();

const dao = require('../dao/activity');

router.get('/list', (req, res, next) => {
    dao.list(req, res, next);
});

router.get('/get/:id', (req, res, next) => {
    dao.get(req, res, next);
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

module.exports = router;
