const service = require('../services/activity');
const util = require('../util');

async function add(ctx) {
    const body = ctx.request.body;
    if (ctx.session.admin) {
        const result = await service.add(body.title, body.date, body.address);
        if (result) {
            ctx.status = util.success.code;
            ctx.body = util.success;
        }
    } else {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
    }
}

async function update(ctx) {
    const body = ctx.request.body;
    if (ctx.session.admin) {
        const result = await service.update(body.id, body.title, body.date, body.address);
        if (result) {
            ctx.status = util.success.code;
            ctx.body = util.success;
        }
    } else {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
    }
}

async function remove(ctx) {
    if (ctx.session.admin) {
        const result = await service.remove(ctx.params.id);
        if (result) {
            ctx.status = util.success.code;
            ctx.body = util.success;
        }
    } else {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
    }
}

async function list(ctx) {
    ctx.status = util.success.code;
    ctx.body = await service.list();
}

module.exports = {
    add,
    update,
    remove,
    list
};
