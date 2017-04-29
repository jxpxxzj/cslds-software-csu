const express = require('express');
const router = express.Router();

const dao = require('../dao/introduction');

router.get('/get', (req, res, next) => {
    dao.get(req, res, next);
});

router.post('/add', (req, res, next) => {
    dao.add(req, res, next);
});

router.post('/update', (req, res, next) => {
    dao.update(req, res, next);
});

module.exports = router;
