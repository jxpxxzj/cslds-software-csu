const service = require('../services/material');
const util = require('../util');
const fs = require('fs-extra');
const path = require('path');
const send = require('koa-send');

async function add(ctx) {
    if (!ctx.session.admin) {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
    } else {
        const body = ctx.request.body;
        await service.add(body.title, body.address);
        ctx.status = util.success.code;
        ctx.body = util.success;
    }
}

async function remove(ctx) {
    if (!ctx.session.admin) {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
    } else {
        const id = ctx.params.id;
        const result = await service.remove(id);
        if (result) {
            ctx.status = util.success.code;
            ctx.body = util.success;
        }
    }
}

async function list(ctx) {
    const result = await service.list();
    ctx.status = util.success.code;
    ctx.body = result;
}

async function listFile(ctx) {
    if (!ctx.session.admin) {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
    } else {
        const result = await service.listFile();
        ctx.status = util.success.code;
        ctx.body = result;
    }
}

async function upload(ctx) {
    if (!ctx.session.admin) {
        ctx.status = util.unauthorize.code;
        ctx.body = util.unauthorize;
    } else {
        const tmpPath = ctx.req.file.path;
        const randstr = Math.round(Math.random() * 10000).toString() + '_';
        const targetPath = './public/files/' + randstr + ctx.req.file.originalname;
        await fs.rename(tmpPath, targetPath);
        ctx.status = util.success.code;
        ctx.body = {
            path: randstr + ctx.req.file.originalname,
            size: ctx.req.file.size
        };
    }
}

module.exports = {
    add,
    remove,
    list,
    listFile,
    upload
};
