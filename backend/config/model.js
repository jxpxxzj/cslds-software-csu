const Sequelize = require('sequelize');
const config = require('./config');

const seq = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    port: config.mysql.port,
    dialect: 'mysql'
});

seq.import('../models/activity');
seq.import('../models/admin');
seq.import('../models/application');
seq.import('../models/counselingRoom');
seq.import('../models/course');
seq.import('../models/introduction');
seq.import('../models/material');
seq.import('../models/person');
seq.import('../models/teacher');
seq.import('../models/research');
seq.import('../models/report');

seq.sync();
seq.authenticate();

module.exports = seq;
