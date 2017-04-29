const express = require('express');
const router = express.Router();

const dao = require('../dao/application');

router.post('/add', (req, res, next) => {
    dao.add(req, res, next);
});

router.post('/update', (req, res, next) => {
    dao.update(req, res, next);
});

router.get('/getByPerson/:person', (req, res, next) => {
    dao.getByPerson(req, res, next);
});

router.get('/getByState/:state', (req, res, next) => {
    dao.getByState(req, res, next);
});

module.exports = router;
