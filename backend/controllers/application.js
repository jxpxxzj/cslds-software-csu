const service = require('../services/application');
const util = require('../util');

async function add(ctx) {
    const body = ctx.request.body;
    if (ctx.session.user) {
        const result = await service.add(ctx.session.user.username, body.type, body.detail);
        if (result) {
            ctx.status = util.success.code;
            ctx.body = util.success;
        }
    } else {
        ctx.status = util.unauthorize.code;
        ctx.body = util.success;
    }
}

async function update(ctx) {
    const body = ctx.request.body;
    if (ctx.session.admin) {
        const result = await service.update(body.id, body.detail);
        if (result) {
            ctx.status = util.success.code;
            ctx.body = util.success;
        }
    } else {
        ctx.status = util.unauthorize.code;
        ctx.body = util.success;
    }
}

async function getByPerson(ctx) {
    if (ctx.session.user) {
        const id = ctx.session.user.username;
        const result = await service.getByPerson(id);
        if (result) {
            ctx.status = util.success.code;
            ctx.body = result;
        }
    } else {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
    }
}

async function getByState(ctx) {
    if (ctx.session.admin) {
        const state = ctx.params.state;
        const result = await service.getByState(state);
        if (result) {
            ctx.status = util.success.code;
            ctx.body = result;
        }
    } else {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
    }
}

module.exports = {
    add,
    update,
    getByPerson,
    getByState
};
