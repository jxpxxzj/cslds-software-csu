const controller = require('../controllers/application');
const router = require('koa-router')();

router.post('/add', controller.add);
router.post('/update', controller.update);
router.get('/getByPerson', controller.getByPerson);
router.get('/getByState/:state', controller.getByState);

module.exports = router;
