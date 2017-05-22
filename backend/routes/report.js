const controller = require('../controllers/report');
const router = require('koa-router')();

router.post('/add', controller.add);
router.post('/update', controller.update);
router.get('/remove/:id', controller.remove);
router.get('/list', controller.list);

module.exports = router;
