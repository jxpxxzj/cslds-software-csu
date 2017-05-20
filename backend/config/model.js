const Sequelize = require('sequelize');
const config = require('./config');
const passwordHash = require('password-hash');
const chalk = require('chalk');

const seq = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    host: config.mysql.host,
    port: config.mysql.port,
    dialect: 'mysql'
});

seq.import('../models/activity');
seq.import('../models/admin');
seq.import('../models/application');
seq.import('../models/counselingroom');
seq.import('../models/course');
seq.import('../models/introduction');
seq.import('../models/material');
seq.import('../models/person');
seq.import('../models/teacher');

seq.authenticate();

(async () => {
    await seq.sync({
        force: config.init.force
    });
    if (config.init.force) {
        console.log(chalk.bgRed('Starting with --forceSync'));
        await seq.models.admin.upsert({
            account: config.init.admin.account,
            password: passwordHash.generate(config.init.admin.password)
        });
        await seq.models.introduction.upsert(config.init.introduction);
    }
})();
module.exports = seq;
