const model = require('../models').research;

/**
 * Add a new research report.
 * @param {string} title Title
 * @param {string} address Download address
 * @returns {Promise<boolean>}
 */
async function add(title, address) {
    await model.upsert({
        title,
        address
    });
    return true;
}

/**
 * Edit a existed research report.
 * @param {number} id Research ID
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
 * Remove a existed research report.
 * @param {number} id Research ID
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
 * Get all research reports.
 * @returns {Promise<Research[]>}
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
