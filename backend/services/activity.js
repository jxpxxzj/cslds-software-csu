const model = require('../models').activity;

/**
 * Add a new activity.
 * @param {string} title Activity title
 * @param {Date} date Date
 * @param {string} address Address
 * @returns {Promise<boolean>}
 */
async function add(title, date, address) {
    await model.upsert({
        title,
        date,
        address
    });
    return true;
}

/**
 * Edit a existed activity.
 * @param {number} id Activity id
 * @param {string} title Activity title
 * @param {Date} date Date
 * @param {string} address Address
 * @returns {Promise<boolean>}
 */
async function update(id, title, date, address) {
    await model.update({
        title,
        date,
        address
    }, {
        where: {
            id
        }
    });
    return true;
}

/**
 * Remove a existed activity.
 * @param {number} id Activity id
 * @returns {Promise<boolean>}
 */
async function remove(id) {
    await model.destroy({
        where: {
            id
        }
    });
    return true;
}

/**
 * Get all activities.
 * @returns {Promise<Activity[]>}
 */
async function list() {
    return await model.findAll();
}

module.exports = {
    add,
    update,
    remove,
    list
};
