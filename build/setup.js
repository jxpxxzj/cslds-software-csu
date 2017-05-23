const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');

const build = require('./build');
const sync = require('./sync');
const run = require('./run');

const config = {
    server: {
        port: '3000',
        sessionKey: 'cslds-software-csu'
    },
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'xf',
        port: 3306
    },
    admin: {
        account: 'admin',
        password: 'admin'
    }
};

process.stdout.write('\x1Bc');
console.log(chalk.bgBlue('Setup Script'));

(async () => {
    const isExist = await fs.pathExists(path.resolve(__dirname, '../backend/config/config.json'));
    if (isExist) { // config.json is existed
        const rm = await inquirer.prompt({
            type: 'confirm',
            message: 'config.json is existed, delete it? If you choose no, setup script will load it.',
            name: 'cfm',
            default: false
        });
        if (rm) { // delete file
            fs.remove('./backend/config/config.json');
        } else {
            const cfg = await fs.readJSON('./backend/config/config.json');
            config.mysql = cfg.mysql;
            config.server = cfg.server;
        }
    }

    const questions = [{
        type: 'input',
        name: 'server.port',
        message: 'Server port:',
        default: config.server.port
    }, {
        type: 'input',
        name: 'server.sessionKey',
        message: 'Server session-key:',
        default: config.server.sessionKey
    }, {
        type: 'input',
        name: 'mysql.host',
        message: 'MySQL server address:',
        default: config.mysql.host
    }, {
        type: 'input',
        name: 'mysql.port',
        message: 'MySQL server port:',
        default: config.mysql.port
    }, {
        type: 'input',
        name: 'mysql.user',
        message: 'MySQL username:',
        default: config.mysql.user
    }, {
        type: 'password',
        name: 'mysql.password',
        message: 'MySQL password:',
        default: config.mysql.password
    }, {
        type: 'input',
        name: 'mysql.database',
        message: 'Application database:',
        default: config.mysql.database
    }, {
        type: 'input',
        name: 'admin.account',
        message: 'Initial admin account:',
        default: config.admin.account
    }, {
        type: 'password',
        name: 'admin.password',
        message: 'Initial admin password:',
        default: config.admin.password
    }];

    const answers = await inquirer.prompt(questions);
    await fs.writeJSON('./backend/config/config.json', {
        server: answers.server,
        mysql: answers.mysql
    }, {
        spaces: 4
    });
    const buildNow = await inquirer.prompt({
        type: 'confirm',
        message: 'Build now?',
        name: 'buildNow',
        default: true
    });
    if (buildNow.buildNow) {
        await build();
        await fs.remove('./frontend/dist');
    }
    const syncNow = await inquirer.prompt({
        type: 'confirm',
        message: 'Force sync model with database now?',
        name: 'syncNow',
        default: false
    });
    if (syncNow.syncNow) {
        await sync(answers.admin.account, answers.admin.password);
    }

    const runNow = await inquirer.prompt({
        type: 'confirm',
        message: 'Start server now?',
        name: 'runNow',
        default: false
    });
    if (runNow.runNow) {
        await run();
    } else {
        console.log(chalk.green('Setup complete. use "npm start" to start server.'));
        process.exit(0);
        return;
    }
})();
