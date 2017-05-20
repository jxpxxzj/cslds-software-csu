const service = require('../services/introduction');
const util = require('../util');

async function upsert(ctx) {
    const body = ctx.request.body;
    const result = await service.upsert(body.introduction, body.constitution, body.rule);
    if (result) {
        ctx.status = util.success.code;
        ctx.body = util.success;
    }
}

async function get(ctx) {
    const result = await service.get();
    ctx.status = util.success.code;
    ctx.body = result;
}

module.exports = {
    upsert,
    get
};
