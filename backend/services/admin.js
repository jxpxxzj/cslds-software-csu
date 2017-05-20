const model = require('../models').admin;
const passwordHash = require('password-hash');

/**
 * Check admin login.
 * @param {string} account Admin account
 * @param {string} password Admin password
 * @returns {Promise<boolean>}
 */
async function login(account, password) {
    const result = await model.findOne({
        where: {
            account
        },
        attributes: ['id', 'account', 'password']
    });
    if (result !== null && passwordHash.verify(password, result.password)) {
        return result;
    } else {
        return false;
    }
}

module.exports = {
    login
};
