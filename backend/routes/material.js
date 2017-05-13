const express = require('express');
const router = express.Router();

const dao = require('../dao/material');

router.get('/list', (req, res) => {
    dao.list(req, res);
});

router.get('/getById/:id', (req, res) => {
    dao.getById(req, res);
});

router.post('/add', (req, res) => {
    dao.add(req, res);
});

router.get('/delete/:id', (req, res) => {
    dao.delete(req, res);
});

router.get('/listFile', (req, res) => {
    dao.listFile(req, res);
});

router.post('/upload', (req, res) => {
    dao.upload(req, res);
});

router.get('/download/:fileName', (req, res) => {
    dao.download(req, res);
});

module.exports = router;
