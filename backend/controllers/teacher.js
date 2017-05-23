const service = require('../services/teacher');
const util = require('../util');

async function add(ctx) {
    const body = ctx.request.body;
    if (ctx.session.admin) {
        const result = await service.add(body);
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
        const result = await service.update(body);
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

async function getByType(ctx) {
    const type = ctx.params.type;
    const result = await service.getByType(type);
    ctx.status = util.success.code;
    ctx.body = result;
}

async function getDesc(ctx) {
    const result = await service.getDesc();
    ctx.status = util.success.code;
    ctx.body = result;
}

async function updateDesc(ctx) {
    const body = ctx.request.body;
    if (ctx.session.admin) {
        const result = await service.updateDesc(body.text);
        if (result) {
            ctx.status = util.success.code;
            ctx.body = util.success;
        }
    } else {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
    }
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
