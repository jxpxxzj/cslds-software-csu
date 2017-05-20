const service = require('../services/admin');
const util = require('../util');

async function login(ctx) {
    const body = ctx.request.body;
    const result = await service.login(body.account, body.password);
    if (result) {
        ctx.session.admin = result;
        ctx.status = util.success.code;
        ctx.body = util.success;
    } else {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
    }
}

async function logout(ctx) {
    ctx.session.admin = undefined;
    ctx.status = util.success.code;
    ctx.body = util.success;
}

module.exports = {
    login,
    logout
};
