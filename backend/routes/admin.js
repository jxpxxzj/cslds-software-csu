const express = require('express');
const router = express.Router();

const dao = require('../dao/admin');

router.post('/login', (req, res) => {
    dao.login(req, res);
});

module.exports = router;
