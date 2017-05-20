const controller = require('../controllers/person');
const router = require('koa-router')();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/updateInfo', controller.updateInfo);
router.post('/updatePassword', controller.updatePassword);
router.get('/isUsernameExist/:username', controller.isUsernameExist);

module.exports = router;
