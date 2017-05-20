const controller = require('../controllers/counselingRoom');
const router = require('koa-router')();

router.post('/add', controller.add);
router.post('/update', controller.update);
router.get('/list', controller.list);

module.exports = router;
