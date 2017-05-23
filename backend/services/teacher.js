const model = require('../models').teacher;
const fs = require('fs-extra');
const path = require('path');

/**
 * Add a new teacher.
 * @param {*} data Raw request data
 * @returns {Promise<boolean>}
 */
async function add(data) {
    await model.upsert({
        name: data.name,
        intro: data.intro,
        image: data.image,
        type: data.type,
        'class': data.class,
        phone: data.phone,
        subject: data.subject,
        achievement: data.achievement
    });
    return true;
}

/**
 * Edit a existed teacher.
 * @param {*} data Raw request data
 * @returns {Promise<boolean>}
 */
async function update(data) {
    await model.update({
        name: data.name,
        intro: data.intro,
        image: data.image,
        type: data.type,
        'class': data.class,
        phone: data.phone,
        subject: data.subject,
        achievement: data.achievement
    }, {
        where: {
            id: data.id
        }
    });
    return true;
}

/**
 * Get all teachers.
 * @returns {Promise<Teacher[]>}
 */
async function list() {
    return await model.findAll();
}

/**
 * Remove a existed teacher.
 * @param {number} id Teacher id
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
 * Get teachers of a specific type.
 * @param {string} type Teacher type
 * @returns {Promise<Teacher[]>}
 */
async function getByType(type) {
    return await model.findAll({
        where: {
            type
        }
    });
}

/**
 * Get more-info description.
 * @returns {Promise<MoreInfoDescription>}
 */
async function getDesc() {
    /*eslint-disable*/
    const result = await fs.readJSON(path.resolve(__dirname, '../config/teacher.json')) || { text: '' };
    /*eslint-enable*/
    return result;
}

/**
 * Update more-info description.
 * @param {string} text Description text
 * @returns {Promise<boolean>}
 */
async function updateDesc(text) {
    await fs.ensureFile(path.resolve(__dirname, '../config/teacher.json'));
    await fs.outputJSON(path.resolve(__dirname, '../config/teacher.json'), {
        text
    });
    return true;
}

module.exports = {
    add,
    update,
    list,
    remove,
    getByType,
    getDesc,
    updateDesc
};
