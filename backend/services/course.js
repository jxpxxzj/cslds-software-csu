const model = require('../models').course;

/**
 * Add a new course.
 * @param {string} course Course name
 * @param {Date} time Time
 * @param {string} place Place
 * @returns {Promise<boolean>}
 */
async function add(course, time, place) {
    await model.upsert({
        course,
        time,
        place
    });
    return true;
}

/**
 * Edit a existed course.
 * @param {number} id Course id
 * @param {string} course Course name
 * @param {Date} time Time
 * @param {string} place Place
 * @returns {Promise<boolean>}
 */
async function update(id, course, time, place) {
    await model.update({
        course,
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
 * Get all courses.
 * @returns {Promise<Course[]>}
 */
async function list() {
    return await model.findAll();
}

module.exports = {
    add,
    update,
    list
};
