const controller = require('../controllers/introduction');
const router = require('koa-router')();

router.post('/upsert', controller.upsert);
router.get('/get', controller.get);

module.exports = router;
