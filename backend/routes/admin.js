const express = require('express');
const router = express.Router();

const dao = require('../dao/admin');

router.post('/login', (req, res, next) => {
    dao.login(req, res, next);
});

module.exports = router;
