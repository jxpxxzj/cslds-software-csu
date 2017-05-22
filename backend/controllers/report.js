const service = require('../services/report');
const util = require('../util');

async function add(ctx) {
    const body = ctx.request.body;
    if (ctx.session.admin) {
        const result = await service.add(body.title, body.address);
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
        const result = await service.update(body.id, body.title, body.address);
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
    const id = ctx.params.id;
    if (ctx.session.admin) {
        const result = await service.remove(id);
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
