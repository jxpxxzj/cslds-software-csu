const express = require('express');
const router = express.Router();

const dao = require('../dao/introduction');

router.get('/get', (req, res) => {
    dao.get(req, res);
});

router.post('/add', (req, res) => {
    dao.add(req, res);
});

router.post('/update', (req, res) => {
    dao.update(req, res);
});

module.exports = router;
