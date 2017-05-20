const model = require('../models').introduction;

/**
 * Update introduction.
 * @param {string} introduction Introduction
 * @param {string} constitution Constitution
 * @param {string} rule Rule
 * @returns {Promise<boolean>}
 */
async function upsert(introduction, constitution, rule) {
    await model.upsert({
        introduction,
        constitution,
        rule
    });
    return true;
}

/**
 * Get introduction.
 * @returns {Promise<Introduction>}
 */
async function get() {
    return await model.findOne({
        order: 'id desc',
        attributes: ['introduction', 'constitution', 'rule']
    });
}

module.exports = {
    upsert,
    get
};
