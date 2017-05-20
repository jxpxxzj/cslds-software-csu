const controller = require('../controllers/admin');
const router = require('koa-router')();

router.post('/login', controller.login);
router.get('/logout', controller.logout);

module.exports = router;
