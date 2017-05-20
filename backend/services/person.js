const model = require('../models').person;
const passwordHash = require('password-hash');

/**
 * Check user login.
 * @param {string} username Username
 * @param {string} password Password
 * @returns {Promise<User> | Promise<boolean>}
 */
async function login(username, password) {
    const result = await model.findOne({
        where: {
            username
        },
        attributes: ['id', 'username', 'password', 'class', 'number', 'phone', 'qq']
    });
    if (result !== null && passwordHash.verify(password, result.password)) {
        return result;
    } else {
        return false;
    }
}

/**
 * Add a new user.
 * @param {*} data New user data
 * @returns {Promise<boolean>}
 */
async function register(data) {
    await model.upsert({
        username: data.username,
        password: passwordHash.generate(data.password),
        qq: data.qq,
        'class': data.class,
        phone: data.phone,
        number: data.number
    });
    return true;
}

/**
 * Check if user is existed.
 * @param {string} username Username
 * @returns {Promise<boolean>}
 */
async function isUsernameExist(username) {
    const result = await model.findOne({
        where: {
            username
        }
    });
    return result !== null;
}

/**
 * Update user info.
 * @param {number} id User id
 * @param {User} data New user info
 * @returns {Promise<boolean>}
 */
async function updateInfo(id, data) {
    await model.update({
        qq: data.qq,
        'class': data.class,
        phone: data.phone,
        number: data.number
    }, {
        where: {
            id
        },
        fields: ['qq', 'class', 'phone', 'number']
    });
    return true;
}

/**
 * Update user password
 * @param {number} id User id
 * @param {string} password New password
 * @returns {Promise<boolean>}
 */
async function updatePassword(id, password) {
    await model.update({
        password: passwordHash.generate(password)
    }, {
        where: {
            id
        },
        fields: ['password']
    });
    return true;
}

/**
 * Get user info by its id
 * @param {number} id User id
 * @returns {Promise<User>}
 */
async function getById(id) {
    const result = await model.findById(id, {
        attributes: ['id', 'username', 'qq', 'class', 'phone', 'number']
    });
    return result;
}

/**
 * Get user info by its username.
 * @param {string} username Username
 * @returns {Promise<User>}
 */
async function getByUsername(username) {
    const result = await model.findAll({
        where: {
            username
        },
        attributes: ['id', 'username', 'qq', 'class', 'phone', 'number']
    });
    return result;
}

module.exports = {
    login,
    register,
    isUsernameExist,
    updateInfo,
    updatePassword,
    getById,
    getByUsername
};
