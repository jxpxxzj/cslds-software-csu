const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passwordHash = require('password-hash');
const multer = require('multer');
const upload = multer({
    dest: 'public/file/'
});

const introduction = require('./routes/introduction');
const course = require('./routes/course');
const material = require('./routes/material');
const counselingRoom = require('./routes/counselingRoom');
const admin = require('./routes/admin');
const communication = require('./routes/communication');
const application = require('./routes/application');
const activity = require('./routes/activity');
const person = require('./routes/person');
const teacher = require('./routes/teacher');

const $util = require('./util');

const app = express();

app.use(favicon(path.join(__dirname, 'resources', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
    secret: passwordHash.generate(Math.random().toString()),
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    saveUninitialized: false,
    resave: false
}));
app.use(upload.single('file'));

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));

app.use('/introduction', introduction);
app.use('/course', course);
app.use('/material', material);
app.use('/counselingRoom', counselingRoom);
app.use('/admin', admin);
app.use('/communication', communication);
app.use('/application', application);
app.use('/activity', activity);
app.use('/person', person);
app.use('/teacher', teacher);

app.use('/static', express.static(__dirname + '/public/static'));
app.use('/', express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {

    };
    if (err.status === 404) {
        res.sendFile(path.join(__dirname, 'resources', '404.html'));
        return;
    }
    res.status(err.status || 500);
    $util.jsonWrite(res);
});

module.exports = app;
