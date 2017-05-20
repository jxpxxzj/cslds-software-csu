const startTime = new Date();

// clear terminal
process.stdout.write('\x1Bc');

const fs = require('fs-extra');
const chalk = require('chalk');
const config = require('./config/config');

const Koa = require('koa');
const Router = require('koa-router');
const json = require('koa-json');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const send = require('koa-send');
const serve = require('koa-static');
const session = require('koa-session');
const multer = require('koa-multer');
const mount = require('koa-mount');
const upload = multer({
    dest: './public/files/'
});

const app = new Koa();

// Error handler
app.use(async (ctx, next) => {
    try {
        await next();
        if (!ctx.status || ctx.status === 404) {
            ctx.throw(404);
        }
    } catch (err) {
        console.log('Server error:', chalk.red(err));
        ctx.status = parseInt(err.status) || 500;
        switch (ctx.status) {
        case 404:
            await send(ctx, './public/404.html');
            break;
        case 400:
            break;
        case 500:
        default:
            await send(ctx, './public/500.html');
            break;
        }
    }
});

// E-Tag
app.use(conditional());
app.use(etag({
    weak: true
}));

app.use(async (ctx, next) => {
    ctx.set('X-Powered-By', 'Koa');
    await next();
});

app.use(upload.single('file'));
app.use(bodyParser());
app.use(json());
app.use(logger());
app.keys = [config.server.sessionKey];
app.use(session({
    key: config.server.sessionKey,
    httpOnly: true,
    signed: true,
    maxAge: 86400000,
    overwrite: true
}, app));

// Router
const router = new Router({
    prefix: '/api'
});

const introduction = require('./routes/introduction');
const person = require('./routes/person');
const material = require('./routes/material');
const admin = require('./routes/admin');
const application = require('./routes/application');
const counselingRoom = require('./routes/counselingRoom');
const course = require('./routes/course');
const activity = require('./routes/activity');
const teacher = require('./routes/teacher');
router.use('/introduction', introduction.routes());
router.use('/person', person.routes());
router.use('/material', material.routes());
router.use('/admin', admin.routes());
router.use('/application', application.routes());
router.use('/counselingRoom', counselingRoom.routes());
router.use('/course', course.routes());
router.use('/activity', activity.routes());
router.use('/teacher', teacher.routes());
app.use(router.routes());

// Static file
app.use(mount('/api/material/download', serve(__dirname + '/public/files')));
app.use(mount('/', serve(__dirname + '/public')));

// Startup
app.listen('3000', async () => {
    await fs.copy('./resources/404.html', './public/404.html');
    await fs.copy('./resources/favicon.ico', './public/favicon.ico');
    console.log(chalk.green('Koa is listening on 3000...'));
    console.log(chalk.blue('Start time:', startTime.toLocaleString()));
});

module.exports = app;
