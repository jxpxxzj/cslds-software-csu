const passwordHash = require('password-hash');
const chalk = require('chalk');

module.exports = async (account, password) => {
    console.log(chalk.bgRed('Force syncing...'));
    const seq = require('../backend/config/model');
    await seq.sync({
        force: true
    });
    if(account !== undefined && password !== undefined) { // call function by node -e
        await seq.models.admin.upsert({
            account,
            password: passwordHash.generate(password)
        });
    }
    await seq.models.introduction.upsert({
        introduction: '',
        constitution: '',
        rule: ''
    });
    return;
};
