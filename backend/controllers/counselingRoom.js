const service = require('../services/counselingRoom');
const util = require('../util');

async function add(ctx) {
    const body = ctx.request.body;
    if (ctx.session.admin) {
        const result = await service.add(body.time, body.place);
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
        const result = await service.update(body.id, body.time, body.place);
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
    const result = await service.list();
    ctx.status = util.success.code;
    ctx.body = result;
}

module.exports = {
    add,
    update,
    list
};
