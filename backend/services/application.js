const model = require('../models').application;

/**
 * Add a new application.
 * @param {string} person Username
 * @param {string} type Application type
 * @param {string} detail Application detail
 * @returns {Promise<boolean>}
 */
async function add(person, type, detail) {
    await model.upsert({
        person,
        type,
        detail,
        state: '申请中'
    });
    return true;
}

/**
 * Update existed detail, and make it be checked.
 * @param {number} id Application id
 * @param {string} detail Application reply (as new detail)
 * @returns {Promise<boolean>}
 */
async function update(id, detail) {
    await model.update({
        detail,
        state: '已阅'
    }, {
        where: {
            id
        },
        fields: ['detail', 'state']
    });
    return true;
}

/**
 * Get one's all application.
 * @param {string} person Username
 * @returns {Promise<Application>}
 */
async function getByPerson(person) {
    const result = await model.findAll({
        where: {
            person
        },
        attributes: ['id', 'type', 'detail', 'state', 'createdAt']
    });
    return result;
}

/**
 * Get all application in the specific state
 * @param {string} state Application's state
 * @returns {Promise<State>}
 */
async function getByState(state) {
    const result = await model.findAll({
        where: {
            state
        },
        attributes: ['id', 'person', 'type', 'detail', 'state', 'createdAt']
    });
    return result;
}

module.exports = {
    add,
    update,
    getByPerson,
    getByState
};
