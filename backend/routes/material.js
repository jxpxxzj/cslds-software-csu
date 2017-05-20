const controller = require('../controllers/material');
const router = require('koa-router')();

router.post('/add', controller.add);
router.get('/remove/:id', controller.remove);
router.get('/list', controller.list);
router.get('/listFile', controller.listFile);
router.post('/upload', controller.upload);

module.exports = router;
