const service = require('../services/person');
const util = require('../util');

async function login(ctx) {
    const body = ctx.request.body;
    const data = await service.login(body.username, body.password);
    if (data) {
        ctx.session.user = data;
        ctx.status = util.success.code;
        ctx.body = data;
    } else {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
    }
}

async function register(ctx) {
    const body = ctx.request.body;
    if (await service.isUsernameExist) {
        const result = await service.register(body);
        if (result) {
            ctx.status = util.success.code;
            ctx.body = util.success;
        }
    }
}

async function updateInfo(ctx) {
    if (!ctx.session.user) {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
        return;
    } else {
        const body = ctx.request.body;

        // set default value
        body.class = body.class || ctx.session.user.class;
        body.qq = body.qq || ctx.session.user.qq;
        body.number = body.number || ctx.session.user.number;
        body.phone = body.phone || ctx.session.user.phone;

        const result = await service.updateInfo(ctx.session.user.id, body);
        if (result) {
            ctx.session.user.class = body.class;
            ctx.session.user.qq = body.qq;
            ctx.session.user.number = body.number;
            ctx.session.user.phone = body.phone;
            ctx.status = util.success.code;
            ctx.body = util.success;
        }
    }
}

async function updatePassword(ctx) {
    if (!ctx.session.user) {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
        return;
    } else {
        const body = ctx.request.body;
        const result = await service.updatePassword(ctx.session.user.id, body.password);
        if (result) {
            ctx.status = util.success.code;
            ctx.body = util.success;
        }
    }
}

async function isUsernameExist(ctx) {
    const username = ctx.params.username;
    const result = service.isUsernameExist(username);
    ctx.status = util.success.code;
    ctx.body = {
        isExist: result
    };
}

module.exports = {
    login,
    register,
    updateInfo,
    updatePassword,
    isUsernameExist
};
