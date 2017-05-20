const model = require('../models').material;
const fs = require('fs-extra');

/**
 * Add a material.
 * @param {string} title Material name
 * @param {string} address Material download address
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
 * Remove a material.
 * @param {number} id Material id
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
 * Get a list of materials.
 * @returns {Promise<Material[]>}
 */
async function list() {
    const result = await model.findAll();
    return result;
}

/**
 * Get all files in upload directory.
 * @returns {Promise<string[]>}
 */
async function listFile() {
    const files = await fs.readdir('./public/files');
    return files;
}

/**
 * Get a material by its id.
 * @param {number} id Material id
 * @returns {Promise<Material>}
 */
async function getById(id) {
    const result = await model.findById(id);
    return result;
}

module.exports = {
    add,
    remove,
    list,
    listFile,
    getById
};
