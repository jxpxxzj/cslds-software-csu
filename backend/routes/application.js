const express = require('express');
const router = express.Router();

const dao = require('../dao/application');

router.post('/add', (req, res) => {
    dao.add(req, res);
});

router.post('/update', (req, res) => {
    dao.update(req, res);
});

router.get('/getByPerson/:person', (req, res) => {
    dao.getByPerson(req, res);
});

router.get('/getByState/:state', (req, res) => {
    dao.getByState(req, res);
});

module.exports = router;
