const model = require('../models').report;

/**
 * Add a new work report.
 * @param {string} title Title
 * @param {string} address Address
 */
async function add(title, address) {
    await model.upsert({
        title,
        address
    });
    return true;
}

/**
 * Edit a existed work report.
 * @param {number} id work ID
 * @param {string} title Title
 * @param {string} address Download address
 * @returns {Promise<boolean>}
 */
async function update(id, title, address) {
    await model.update({
        title,
        address
    }, {
        where: {
            id
        }
    });
    return true;
}

/**
 * Remove a existed work report.
 * @param {number} id work ID
 * @returns {Promise<boolean>}
 */
async function remove(id) {
    await model.destory({
        where: {
            id
        }
    });
    return true;
}

/**
 * Get all work reports.
 * @returns {Promise<work[]>}
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
