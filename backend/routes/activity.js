const express = require('express');
const router = express.Router();

const dao = require('../dao/activity');

router.get('/list', (req, res) => {
    dao.list(req, res);
});

router.get('/get/:id', (req, res) => {
    dao.get(req, res);
});

router.post('/add', (req, res) => {
    dao.add(req, res);
});

router.post('/update', (req, res) => {
    dao.update(req, res);
});

router.get('/delete/:id', (req, res) => {
    dao.delete(req, res);
});

module.exports = router;
