const controller = require('../controllers/teacher');
const router = require('koa-router')();

router.post('/add', controller.add);
router.post('/update', controller.update);
router.get('/remove/:id', controller.remove);
router.get('/list', controller.list);
router.get('/getByType/:type', controller.getByType);

module.exports = router;
