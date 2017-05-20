const model = require('../models').counselingRoom;

/**
 * Add a new counseling room.
 * @param {Date} time Available time
 * @param {string} place Place
 * @returns {Promise<boolean>}
 */
async function add(time, place) {
    await model.upsert({
        time,
        place
    });
    return true;
}

/**
 * Edit a exitsed counseling room.
 * @param {number} id Counseling room id
 * @param {Date} time Available time
 * @param {string} place Place
 * @returns {Promise<boolean>}
 */
async function update(id, time, place) {
    await model.update({
        time,
        place
    }, {
        where: {
            id
        }
    });
    return true;
}

/**
 * Get all counseling room.
 * @returns {Promise<CounselingRoom>}
 */
async function list() {
    const result = model.findAll();
    return result;
}

module.exports = {
    add,
    update,
    list
};
