const express = require('express');
const router = express.Router();

const dao = require('../dao/communication');

router.post('/add', (req, res) => {
    dao.add(req, res);
});

router.post('/update', (req, res) => {
    dao.update(req, res);
});

router.get('/delete/:id', (req, res) => {
    dao.delete(req, res);
});

router.get('/getByTime/:time', (req, res) => {
    dao.getByTime(req, res);
});

router.get('/getByPerson/:person', (req, res) => {
    dao.getByPerson(req, res);
});

router.get('/list', (req, res) => {
    dao.list(req, res);
});

module.exports = router;
