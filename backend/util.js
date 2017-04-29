module.exports = {
    jsonWrite(res, ret) {
        if (typeof ret === 'undefined') {
            res.json({
                code: '1',
                msg: 'error'
            });
        } else {
            res.json(ret);
        }
    },
    success: {
        code: 200,
        message: 'success'
    },
    unauthorized: {
        code: 401,
        message: 'unauthorized'
    }
};

