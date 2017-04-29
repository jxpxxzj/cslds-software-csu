const express = require('express');
const router = express.Router();

const dao = require('../dao/material');

router.get('/list', (req, res, next) => {
    dao.list(req, res, next);
});

router.get('/getById/:id', (req, res, next) => {
    dao.getById(req, res, next);
});

router.post('/add', (req, res, next) => {
    dao.add(req, res, next);
});

router.get('/delete/:id', (req, res, next) => {
    dao.delete(req, res, next);
});

router.get('/listFile', (req, res, next) => {
    dao.listFile(req, res, next);
});

router.post('/upload', (req, res, next) => {
    dao.upload(req, res, next);
});

router.get('/download/:fileName', (req, res, next) => {
    dao.download(req, res, next);
});

module.exports = router;
